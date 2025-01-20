"use client"

import { db } from "@repo/db/db"
import { useSession } from "next-auth/react"

export default async function () {
    const session = useSession()
    const response = await db.room.create({
        data:{
            //@ts-ignore
            creatorId:session.data?.user.userid
        }
    })
    const roomid = response.roomid
    return (
        <div>
            hi there iam create page.tsx am i good?
        </div>
    )

}