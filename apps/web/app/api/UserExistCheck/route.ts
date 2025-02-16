import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db/db";

export async function POST(req:NextRequest) {

    try {
        const body = await req.json()
        const res = await db.doubt.findUnique({
            where: {
                doubtid: body.doubtid,
                upvotes: {
                    some: { userid: body.userid }
                }
            },
            select: { doubtid: true } 
        });

        if(res?.doubtid) {
            return NextResponse.json({
                exist:true
            },{
                status:200
            })
        }
        else {
            return NextResponse.json({
                exist:false
            },{
                status:200
            })
        }

    }catch(err) {
        return NextResponse.json({
            msg:"check the internet connection"
        },{
            status:203
        })
    }
}