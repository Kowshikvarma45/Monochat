import { db } from "@repo/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const session = await getServerSession()
    if(!session?.user) {
        return NextResponse.json({
            msg:"Login into your account to get chats"
        },{
            status:203
        })
    }
    try {
        const {roomid} = await req.json();

        const res = await db.room.findUnique({
            where:{
                roomid:roomid
            },
            select:{
                doubts:{
                    select:{
                        userid: true,
                        roomid: true,
                        title: true,
                        description: true,
                        doubtid: true,
                        timestamp:true,
                        upvotes:true,
                        creator:{
                            select:{
                                username:true
                            }
                        }
                    }
                }
            }
        })
        if(res?.doubts) {
            return NextResponse.json({
                response:res.doubts
            },{
                status:200
            })
        }
        else {
            return NextResponse.json({
                msg:"Sorry Roomid doent exist"
            },{
                status:203
            })
        }

    }catch(err) {
        return NextResponse.json({
            msg:"Network Error"
        },{
            status:205
        })

    }
}