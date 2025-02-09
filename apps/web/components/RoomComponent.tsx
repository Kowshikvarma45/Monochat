"use client";

import React from "react";

interface RoomProps {
  roomname: string;
  creator: string;
  createdAt: string;
  onJoin: () => void;
}

const RoomComponent: React.FC<RoomProps> = ({ roomname, creator, createdAt, onJoin }) => {
  return (
    <div className="relative bg-[#232428]/80 backdrop-blur-lg border border-gray-700 rounded-xl shadow-md p-5 w-full max-w-lg transition-all hover:shadow-xl hover:scale-[1.03]">
      <h2 className="text-2xl font-semibold text-white tracking-wide">{roomname}</h2>
      <p className="text-sm text-gray-400 mt-1">Created by: <span className="text-gray-300">{creator}</span></p>
      <p className="text-xs text-gray-500">Created on: {createdAt}</p>
      
      <button 
        className="mt-4 w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 rounded-lg shadow-md transition-all duration-200"
        onClick={onJoin}
      >
        Join Room 
      </button>
      
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-green-500 transition-all"></div>
    </div>
  );
};

export default RoomComponent;
