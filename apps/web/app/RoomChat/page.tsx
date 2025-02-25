"use client"

import { useSearchParams } from "next/navigation"; 
import { Chat } from "../../components/Chat";
import { Spinner } from "../../components/Spinner";
import { Suspense } from 'react';

export default function RoomChat() {
  return (
    <Suspense fallback={<Spinner />}>
      <RoomChatContent />
    </Suspense>
  );
}

function RoomChatContent() {
  const searchParams = useSearchParams();
  const roomid = searchParams.get("roomid");
  const roomname = searchParams.get("roomname");

  if (!roomid) {
    return <Spinner />;
  }

  return <Chat roomname={roomname} roomId={roomid} />;
}