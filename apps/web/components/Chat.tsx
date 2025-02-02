"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";

export const Chat = ({roomId}:{roomId:string | string[] | undefined})=>{
    console.log("receiverd roomid is : ",roomId)
    const session = useSession();
    const [messages, setMessages] = useState<{roomid:string | string[] | undefined, userid: string; name: string; msg: string }[]>([]);
    const [input, setInput] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);
        ws.onmessage = (event) => {
            const obj = JSON.parse(event.data);
            setMessages((prev) => [...prev, {roomid:obj.roomid, userid: obj.userid, name: obj.name, msg: obj.msg }]);
        };
        ws.onerror = (error) => console.log("WebSocket error:", error);
        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (socket && input.trim() !== "") {
            const obj = {
                //@ts-ignore
                userid: session.data?.user.userid,
                roomid:roomId,
                name: session.data?.user?.name || "Unknown",
                msg: input,
            };
            socket.send(JSON.stringify(obj));
            setMessages((prev) => [...prev, obj]);
            setInput("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-5 text-center font-bold text-xl">
                    WebSocket Chat
                </div>
                <div className="h-96 overflow-y-auto p-4 space-y-4 flex flex-col">
                {messages
        .filter((message) => message.roomid === roomId) 
        .map((message, index) => (
            <div
                key={index}
                className={`flex items-start ${//@ts-ignore
                    message.userid === session.data?.user.userid ? "justify-end" : "justify-start"
                }`}
            >
                <div
                    className={`max-w-xs p-3 rounded-xl text-sm shadow-md flex flex-col space-y-1 transition-all transform hover:scale-105 ${//@ts-ignore
                        message.userid === session.data?.user.userid
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    { //@ts-ignore
                        message.userid !== session.data?.user.userid && (
                            <div className="font-semibold text-lg text-black">{message.name}</div>
                        )
                    }
                    <div className="text-base font-medium">{message.msg}</div>
                </div>
            </div>
        ))
    }
                </div>
                <div className="flex items-center p-4 bg-gray-900 border-t border-gray-700">
                    <input
                        className="flex-1 p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="ml-3 p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center justify-center"
                        onClick={sendMessage}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );

}