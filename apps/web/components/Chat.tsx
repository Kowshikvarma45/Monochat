"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { Send, ChevronDown, Copy, Clipboard } from "lucide-react";
import { Message } from "./Message";
import axios from "axios";
import { Spinner } from "./Spinner";

export const Chat = ({ roomId, roomname }: { roomId: string | string[] | undefined; roomname: string | null }) => {
    const session = useSession();
    const [messages, setMessages] = useState<
        { roomid: string; title: string; description: string; userid: string; doubtid:string; creator:{username: string}; upvotes: {
            userid: string;
            username: string;
            email: string;
            password: string;
        }[]; timestamp: number }[]
    >([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"most-upvoted" | "newest" | "oldest">("oldest");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [copied,setcopied] = useState(false)
    const [loading,setloading] = useState(false)
    const [msgloading,setmsgloading] = useState(true)
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        socketRef.current = ws;
        ws.onopen = () => console.log("WebSocket Connected ✅");
        ws.onmessage = (event) => {
            const obj = JSON.parse(event.data);
            console.log("Received message from WebSocket:", obj);

            setMessages((prev) => [...prev, obj]);
        };
        ws.onerror = (error) => console.log("WebSocket error:", error);

        async function getprevchats() {
            try {
                const res = await axios.post("http://localhost:3000/api/GetRoomChats",{
                roomid:roomId
            })
            if(res.status == 200) {
                setMessages(res.data.response)
                setmsgloading(false)
            }
            else {
                alert(res.data.msg)
            }
            }catch(err) {
                alert("check the Internet connection")
            }
        }
        getprevchats()
        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const copyToClipboard = () => {
        //@ts-ignore
        navigator.clipboard.writeText(roomId).then(() => {
            setcopied(true);
            setTimeout(() => setcopied(false), 2000);
        });
    };

    const sendMessage = async() => {
        setloading(true)
        if (socketRef.current && title.trim() !== "" && description.trim() !== "") {
            try {
                const res = await axios.post("http://localhost:3000/api/Createmsg",{
                    //@ts-ignore
                    userid: session.data?.user?.userid,
                    roomid:roomId,
                    title:title,
                    timestamp:new Date(),
                    description:description
                })
                if(res.status == 200) {
                    setloading(false)
                    const obj = {
                        doubtid:res.data.doubtid,
                        //@ts-ignore
                        userid: res.data.userid,
                        roomid: res.data.roomid,
                        creator:{
                            //@ts-ignore
                            username: session.data?.user.name || "Unknown",
                        },
                        title:res.data.title,
                        description:res.data.description,
                        upvotes: res.data.upvotes, 
                        timestamp: res.data.timestamp,
                    };
                    setMessages((prev) => [...prev, obj]);
                    socketRef.current.send(JSON.stringify(obj));
                    setTitle("");
                    setDescription("");
                }
                else {
                    alert(res.data.msg)
                    setloading(false)
                    return
                }
            }catch(err) {
                alert("network error message not sent")
                setloading(false)
                return
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sortedMessages = [...messages].sort((a, b) => {
        if (sortOrder === "most-upvoted") {
            return b.upvotes.length - a.upvotes.length; 
        } else if (sortOrder === "oldest") {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); 
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); 
    });

    return (
        <div className="h-screen flex bg-gray-900 p-6">
            {/* Left Side (Dropdown & Input Fields) */}
            <div className="lg:w-[40%] w-full p-4 bg-gray-700 border-r border-gray-600">
                {/* Sorting Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between p-3 bg-gray-800 text-white border border-gray-600 rounded-xl"
                    >
                        {sortOrder === "most-upvoted"
                            ? "Most Upvoted"
                            : sortOrder === "oldest"
                            ? "Oldest"
                            : "Newest"}
                        <ChevronDown size={18} />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute w-full text-white bg-gray-800 border border-gray-600 rounded-xl mt-2">
                            <button
                                className="w-full text-left p-2 hover:bg-gray-700"
                                onClick={() => {
                                    setSortOrder("newest");
                                    setDropdownOpen(false);
                                }}
                            >
                                Sort by Newest first
                            </button>
                            <button
                                className="w-full text-left p-2 hover:bg-gray-700"
                                onClick={() => {
                                    setSortOrder("oldest");
                                    setDropdownOpen(false);
                                }}
                            >
                                Sort by Oldest first
                            </button>
                            <button
                                className="w-full text-left p-2 hover:bg-gray-700"
                                onClick={() => {
                                    setSortOrder("most-upvoted");
                                    setDropdownOpen(false);
                                }}
                            >
                                Sort by Most Upvoted
                            </button>
                        </div>
                    )}
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-3 mt-4">
                    <input
                        className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded-xl"
                        type="text"
                        placeholder="Enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded-xl resize-none h-30"
                        placeholder="Enter description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Send Message Button */}
                <button
                    className={`${title === "" || description === "" ? "cursor-not-allowed opacity-50" : "cursor-pointer"} mt-3 w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all mb-5 flex items-center justify-center ${loading?"animate-pulse":"animate-none"}`}
                    onClick={sendMessage}
                    disabled={title === "" || description === ""}
                >
                    <Send size={20} />
                    <span className="ml-2">{loading?"Sending...":"Send"}</span>
                </button>
                <div className="flex justify-between">
                    <div className="text-white text-2xl">{roomname}</div>
                    <div>
                        <button className="flex">
                        <h1 className="text-green-500">{copied?"Copied":""}</h1>
                        <Clipboard
                                className="ml-1 w-5 h-5 text-gray-500 cursor-pointer hover:text-white transition"
                                //@ts-ignore
                                onClick={copyToClipboard}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side (Messages Display) */}
            <div className="lg:w-[60%] w-full h-[680px] overflow-y-auto px-6 py-4 flex flex-col space-y-4 scrollbar-thin scrollbar-thumb-gray-600">
            {msgloading ? (
                <div className="flex justify-center">
                    <Spinner></Spinner>
                </div> // Loading state
            ) : (
                sortedMessages
                    .filter((message) => String(message.roomid) === String(roomId))
                    .map((message, index) => (
                        <Message
                            key={index}
                            userid={message.userid}
                            name={message.creator.username}
                            title={message.title}
                            description={message.description}
                            createdat={new Date(message.timestamp).toLocaleTimeString()}
                            upvotes={0}
                        />
                    ))
            )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};
