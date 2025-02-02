"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Clipboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const router = useRouter();

    if (status === "loading") {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">User Not Logged In</h2>
                    <p className="text-gray-600 mt-2">Login to verify your account</p>
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                        onClick={async () => {
                            await signIn();
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-500 flex items-center justify-center text-white font-bold text-lg rounded-full">
                        {user.name ? user.name[0]?.toUpperCase() : ""}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                        <span className="text-gray-700">Username</span>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">{user.name}</span>
                            <Clipboard
                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800 transition"
                                onClick={() => navigator.clipboard.writeText(user.name || "")}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                        <span className="text-gray-700">Email</span>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">{user.email}</span>
                            <Clipboard
                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800 transition"
                                onClick={() => navigator.clipboard.writeText(user.email || "")}
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-md shadow-md flex items-center justify-center space-x-2 hover:bg-red-600 transition"
                    onClick={async () => {
                        await signOut();
                    }}
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
