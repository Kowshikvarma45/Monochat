"use client"

import { useSearchParams } from "next/navigation"; 
import { Chat } from "../../components/Chat";

export default function () {
    const searchParams = useSearchParams();  
    const roomid = searchParams.get("roomid");  

    console.log("Received roomid:", roomid); 

    if (!roomid) {
        
        return <div>Loading...</div>;
    }

    return (
        <Chat roomId={roomid}></Chat>  
    );
}
