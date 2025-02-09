"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; 

export const Appbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = session?.user;

    const handleAuthAction = async () => {
        if (status === "loading") return;
        if (isAuthenticated) {
            await signOut();
        } else {
            router.push("../api/auth/signup");
        }
    };

    return (
        <div className="bg-gray-950 sticky top-0 z-50 w-full">
            <div className="flex justify-between items-center bg-black-50 p-5 border-s-orange-300">
                <div
                    className="text-3xl text-white font-mono hover:scale-105 cursor-pointer"
                    onClick={() => router.push("../../")}
                >
                    LogDoubts
                </div>
                
    
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                <div className="hidden md:flex space-x-3">
                    <button
                        className="px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black"
                        onClick={() => router.push("../Account")}
                    >
                        Account
                    </button>
                    <button
                        className="px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black"
                        onClick={() => router.push("../UserCreatedRooms")}
                    >
                        Created Rooms
                    </button>
                    <button
                        className="px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black"
                        onClick={handleAuthAction}
                    >
                        {isAuthenticated ? "Logout" : "SignUp"}
                    </button>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden flex flex-col items-center bg-gray-800 p-4 space-y-3">
                    <button
                        className="w-full px-3 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-black"
                        onClick={() => { router.push("../Account"); setIsOpen(false); }}
                    >
                        Account
                    </button>
                    <button
                        className="w-full px-3 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-black"
                        onClick={() => { router.push("../UserCreatedRooms"); setIsOpen(false); }}
                    >
                        Created Rooms
                    </button>
                    <button
                        className="w-full px-3 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-black"
                        onClick={() => { handleAuthAction(); setIsOpen(false); }}
                    >
                        {isAuthenticated ? "Logout" : "SignUp"}
                    </button>
                </div>
            )}
        </div>
    );
};