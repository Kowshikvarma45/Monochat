import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db/db";
import { getServerSession } from "next-auth";

export async function POST(req:NextRequest) {
    const session = await getServerSession()
    if(!session?.user?.email) {
        return NextResponse.json({
            msg:"Login to send/create a message"
        },{
            status:203
        })
    }
    try {
        
        const {userid} = await req.json();

        const res = await db.user.findUnique({
            where:{
                userid:userid
            },
            select:{
                username:true
            }
        })

        if(res) {
            return NextResponse.json(res,{
                status:200
            })
        }
        else {
            return NextResponse.json({
                msg:"please check the internet connect"
            },{
                status:203
            })
        }
    }catch(err) {
        return NextResponse.json({
            msg:"please check the internet connection"
        },{
            status:203
        })

    }
}