import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db/db";

export async function POST(req: NextRequest) {
    try {
        if(!req.body) {
            return NextResponse.json({
                msg:"no body defined"
            })
        }
        const data = await req.json();

        // ✅ Check if roomid is provided
        if (!data.roomid) {
            return NextResponse.json(
                { msg: "Room ID is required" },
                { status: 400 }
            );
        }

        const roomid = data.roomid;

        // ✅ Check if Room Exists
        const response = await db.room.findUnique({
            where: { roomid },
            select:{
                roomid:true,
                roomname:true
            }
        });
        console.log(response)
        if (response) {
            return NextResponse.json(
                {
                    roomname: response.roomname,
                    roomid:roomid
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { msg: "No room ID found" },
                { status: 404 } // ✅ 404 is correct for "not found"
            );
        }
    } catch (err) {
        console.error("Prisma Error:", err);
        return NextResponse.json(
            { msg: "Internal Server Error" },
            { status: 500 } // ✅ Correct status for Prisma error
        );
    }
}
