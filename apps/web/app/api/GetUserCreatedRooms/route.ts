import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db/db";

export async function POST(req:NextRequest) {

    try {
        const {userid} = await req.json();
        console.log("userid is : ",userid)

        const response = await db.user.findUnique({
            where:{
                userid:userid
            },
            select:{
                createdRooms:true
            }
        })
        console.log(response)
        if(!response)  {
            return NextResponse.json({
                msg:"Sorry No Room exist for the given Roomid"
            },{
                status:203
            })
        }
        else {
        return NextResponse.json({
            createdrooms:response.createdRooms
        },{
            status:200
        })
        }


    }catch(err) {
        return NextResponse.json({
            msg:"check the internet connection"
        },{
            status:500
        })
    }

}