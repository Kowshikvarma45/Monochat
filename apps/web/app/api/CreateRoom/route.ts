import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db/db";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession();

        // ✅ Debugging Session
        console.log("Session Data:", session);

        // ✅ Ensure User is Logged In
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { msg: "Login required to create a room" },
                { status: 400 }
            );
        }

        // ✅ Fetch User ID from Database (if missing in session)
        const user = await db.user.findUnique({
            where: { email: session.user.email },
            select: { userid: true }, // Assuming your user table has `id`
        });

        if (!user) {
            return NextResponse.json(
                { msg: "User not found in database" },
                { status: 404 }
            );
        }

        // ✅ Create Room
        const res = await db.room.create({
            data: { creatorId: user.userid }, // Use fetched user ID
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
