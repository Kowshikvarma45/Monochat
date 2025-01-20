"use client"

import { signIn,signOut,useSession } from "next-auth/react"
export const Appbar = ()=>{
    const session = useSession()
    return (
        <div className="bg-gray-900 sticky top-0 z-50">
            <div className="flex justify-between bg-black-50 p-5 border-s-orange-300">
            <div className="text-3xl  text-white font-mono">
                Logchat
            </div>
            <div className="flex justify-between">
            <button className="mr-3 px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black" onClick={()=>{
                const user = session.data?.user
                const showuser = {
                    name:user?.name,
                    email:user?.email
                }
                alert(JSON.stringify(user))
            }}>Account</button>
            <button className="px-3 py-1 border-2 border-white text-white rounded-md hover:scale-105 hover:bg-white duration-300 hover:text-black" onClick={async()=>{
                if(session.data?.user) {
                    await signOut()
                }
                else {
                    await signIn()
                }
            }}>{session.data?.user?"Logout":"Signin"}</button>
            </div>
            </div>
        </div>
    )
}