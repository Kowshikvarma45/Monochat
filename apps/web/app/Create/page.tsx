"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCopy, ArrowRight } from "lucide-react";

export default function RoomPage() {
    const [roomid, setRoomid] = useState("");
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchRoomId = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/CreateRoom");
                if (response.status === 200) {
                    alert("Room created successfully");
                    setRoomid(response.data.roomid);
                } else {
                    alert("Login to create a room ID");
                }
            } catch (err: any) {
                alert("Error: " + err.response?.status + " " + err.message);
            }
        };

        fetchRoomId();
    }, []); // Fetches room ID on mount

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomid).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                <p className="text-lg font-semibold">
                    Room ID:{" "}
                    <span className="text-green-400 font-bold">{roomid || "Loading..."}</span>
                </p>

                {/* Copy Button */}
                <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all mt-4 w-full"
                    disabled={!roomid}
                >
                    <ClipboardCopy size={18} className="mr-2" />
                    {copied ? "Copied!" : "Copy Room ID"}
                </button>

                {/* Join Room Button */}
                <button
                    onClick={() => router.push(`../RoomChat/?roomid=${roomid}`)}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all mt-4 w-full"
                    disabled={!roomid}
                >
                    <ArrowRight size={18} className="mr-2" />
                    Join the Room
                </button>
            </div>
        </div>
    );
}
