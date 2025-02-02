"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

    const [roomid,setroomid] = useState<string>("");
    const router = useRouter()

    async function handlejoin(event: React.FormEvent) {
        event.preventDefault();

        const res = await axios.post(
            "http://localhost:3000/api/RoomExist",
            { roomid: roomid }, 
            { headers: { "Content-Type": "application/json" } } // ✅ Explicitly set JSON
        );
        
        if(res.status == 200) {
            console.log("hit there raa bava",res.data)
            router.push(`../RoomChat/?roomid=${roomid}&roomname=${res.data.roomname}`)
        }
        else {
            alert("sorry defined roomid doesnt exist")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md shadow-xl rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white text-center mb-4">Join a Chat Room</h2>
                <form onSubmit={handlejoin} className="flex flex-col space-y-4">
                    <input
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={(e) => setroomid(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all duration-200"
                    >
                        Join Room
                    </button>
                </form>
            </div>
        </div>
    );
    
}
