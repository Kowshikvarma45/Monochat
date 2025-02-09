"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading ,setloading] = useState(false)

    async function handler(event: React.FormEvent) {
        event.preventDefault();
        setloading(true)
        if(email=="" || password == "") {
            alert("enter the credentials for Signing in")
        }
        try {
            const response = await axios.post("http://localhost:3000/api/usersignin", {
                email: email,
                password: password
            });

            if (response.status === 200) {
                const result = await signIn("credentials", {
                    redirect: false,
                    userid:response.data.userid,
                    username:response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                });
                if (result?.error) {
                    alert("Some unknown error occurred");
                } else {
                    alert("User Successfully Signed in");
                    router.push("../../../");
                }
            }else {
                alert(response.data.msg);
                setloading(false)
            }
        } catch (error) {
            alert("Error Please check your internet connection. Please try again.");
            setloading(false)
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-6 text-white shadow-lg">
                <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
                <form className="space-y-4" onSubmit={handler}>
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-colors duration-300 ${loading?"animate-pulse":"animate-none"} hover:scale-105 duration-300`}
                    >
                        {loading?"Signing in ...":"Signin"}
                    </button>
                    <p className="text-sm text-center text-gray-400">
                        Don't have an account? 
                        <button 
                            type="button" 
                            className="text-green-500 hover:text-green-400 font-medium ml-1"
                            onClick={() => router.push("../auth/signup")}
                        >
                            Sign Up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
