"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Appbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAuthenticated = session?.user;

    const handleAuthAction = async () => {
        if (status === "loading") return; // Prevent signOut/signIn when loading
        if (isAuthenticated) {
            await signOut();
        } else {
            signIn();
        }
    };

    return (
        <div className="bg-gray-900 sticky top-0 z-50">
            <div className="flex justify-between bg-black-50 p-5 border-s-orange-300">
                <div
                    className="text-3xl text-white font-mono hover:scale-105 cursor-pointer"
                    onClick={() => {
                        router.push("../");
                    }}
                >
                    Logchat
                </div>
                <div className="flex justify-between">
                    <button
                        className="mr-3 px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black"
                        onClick={() => {
                            router.push("../Account");
                        }}
                    >
                        Account
                    </button>
                    <button
                        className="px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black"
                        onClick={handleAuthAction}
                    >
                        {isAuthenticated ? "Logout" : "Signin"}
                    </button>
                </div>
            </div>
        </div>
    );
};
