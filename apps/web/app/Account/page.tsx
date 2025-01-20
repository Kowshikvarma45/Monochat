"use client"

import { useSession } from "next-auth/react"
export default async function () {
    const session = useSession()
    if(!session.data?.user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="">User not logged in login to verify tour account</div>
                <div>
                    <button className="rounded-md bg-white px-3 py-2">Signin</button>
                </div>
            </div>
        )
    }
}
    