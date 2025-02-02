import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db/db";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        const {roomname} = await req.json()
        console.log("roomname : ", roomname)
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { msg: "Login required to create a room" },
                { status: 400 }
            );
        }

        const user = await db.user.findUnique({
            where: { email: session.user.email },
            select: { userid: true }, 
        });

        if (!user) {
            return NextResponse.json(
                { msg: "User not found in database" },
                { status: 404 }
            );
        }

        const res = await db.room.create({
            data: { 
                creatorId: user.userid,
                roomname:roomname
            
            }, 
        });

        return NextResponse.json(
            { roomid: res.roomid },
            { status: 200 }
        );

    } catch (error:any) {
        console.error("CreateRoom Error:", error);
        return NextResponse.json(
            { msg: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
