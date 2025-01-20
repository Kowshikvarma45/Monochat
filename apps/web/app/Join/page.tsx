"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
    const session = useSession();
    const [messages, setMessages] = useState<{userid:string; name: string; msg: string }[]>([]);
    const [input, setInput] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Establish a WebSocket connection
        const ws = new WebSocket("ws://localhost:8080");

        // Store the WebSocket instance
        setSocket(ws);

        // Handle incoming messages
        ws.onmessage = (event) => {
            const obj = JSON.parse(event.data);
            setMessages((prev) => [...prev, {userid:obj.userid, name: obj.name, msg: obj.msg }]);
        };

        // Handle errors
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Clean up the WebSocket connection on unmount
        return () => {
            ws.close();
        };
    }, []);

    // Send a message to the WebSocket server
    const sendMessage = () => {
        if (socket && input.trim() !== "") {
            const obj = {
                //@ts-ignore
                userid:session.data?.user.userid,
                name: session.data?.user?.name || "Unknown",
                msg: input,
            };
            socket.send(JSON.stringify(obj));
            setMessages((prev) => [...prev, obj]);
            setInput(""); // Clear the input field
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-md">
                <div className="bg-green-500 text-white p-4 text-center rounded-t-md">
                    <h1 className="text-xl font-bold">WebSocket Chat</h1>
                </div>

                {/* Message List */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                //@ts-ignore
                                message.name === session.data?.user?.name && message.userid === session.data.user.userid
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs p-3 rounded-lg text-sm shadow-md ${
                                    //@ts-ignore
                                    message.name === session.data?.user?.name && message.userid === session.data.user.userid
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                <div className="font-semibold">
                                    { //@ts-ignore
                                    message.userid !== session.data.user.userid?message.name:""}
                                </div>
                                <div>{message.msg}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <div className="flex items-center p-4 border-t border-gray-300">
                    <input
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
