"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCopy, ArrowRight } from "lucide-react";

export default function RoomPage() {
    const [roomid, setRoomid] = useState("");
    const [roomname, setRoomname] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [created,setcreated] = useState(false)
    const router = useRouter();

    const handleCreateRoom = async () => {
        if (roomname === "") {
            alert("Please enter a room name.");
            return;
        }
        else {
            setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/CreateRoom",
                { roomname:roomname },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200) {
                alert("Room created successfully");
                setcreated(true)
                setRoomid(response.data.roomid);
            } else {
                alert("Failed to create a room. Please try again.");
            }
        } catch (err: any) {
            alert("Error: " + err.response?.status + " " + err.message);
        } finally {
            setLoading(false);
        }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomid).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); 
        });
    };

    const handleJoinRoom = () => {
        if (!roomid) {
            alert("Please create a room first.");
            return;
        }

        router.push(`../RoomChat/?roomid=${roomid}&roomname=${roomname}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                <p className="text-lg font-semibold">
                    Room ID:{" "}
                    <span className="text-green-400 font-bold">{roomid || "Not created yet"}</span>
                </p>

                <div className="mt-4">
                    <input
                        type="text"
                        value={roomname}
                        disabled={created}
                        onChange={(e) => setRoomname(e.target.value)}
                        placeholder="Enter Room Name"
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    onClick={handleCreateRoom}
                    className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all mt-4 w-full"
                    disabled={loading || roomname === ""}
                >
                    {loading ? "Creating Room..." : "Create Room"}
                </button>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all mt-4 w-full"
                    disabled={!roomid}
                >
                    <ClipboardCopy size={18} className="mr-2" />
                    {copied ? "Copied!" : "Copy Room ID"}
                </button>

                <button
                    onClick={handleJoinRoom}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all mt-4 w-full"
                    disabled={!roomid || !roomname}
                >
                    <ArrowRight size={18} className="mr-2" />
                    Join the Room
                </button>
            </div>
        </div>
    );
}
