"use client"

import { useSearchParams } from "next/navigation"; 
import { Chat } from "../../components/Chat";
import { Spinner } from "../../components/Spinner";

export default function () {
    const searchParams = useSearchParams();  
    const roomid = searchParams.get("roomid"); 
    const roomname = searchParams.get("roomname") 

    console.log("Received roomid:", roomid); 

    if (!roomid) {
        return <Spinner></Spinner>
    }

    return (
        <Chat roomname={roomname} roomId={roomid}></Chat>  
    );
}
