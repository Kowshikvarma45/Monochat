"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";

interface MessageProps {
  userid: string;
  name: string;
  title?: string;
  description: string;
  createdat: string;
  upvotes:number;
}

export const Message = ({ userid, name, title, description, createdat, upvotes }: MessageProps) => {
  const session = useSession();
  //@ts-ignore
  const isUserMessage = userid === session.data?.user.userid;

  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 45; 

  const handleUpvote = () => {
    setUpvoted((prev) => !prev);
    setUpvoteCount((prev) => (upvoted ? prev - 1 : prev + 1));
  };

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} px-6 py-2 space-x-2`}>
      {!isUserMessage && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className={`flex flex-col space-y-2 ${isUserMessage ? "items-end" : "items-start"}`}>
        <span className={`text-xs font-semibold ${isUserMessage ? "text-green-500" : "text-blue-500"}`}>
          {name}
        </span>

        <div
          className={`relative px-4 py-3 text-sm rounded-xl shadow-lg transition-all duration-200 
                      break-words whitespace-pre-wrap max-w-[350px] w-fit ${
                        isUserMessage ? "border-2 border-green-700 text-white" : "border-2 border-white text-white"
                      }`}
        >
          {title && <h3 className="font-serif text-2xl mb-1">{title}</h3>}
          <div className={`${isUserMessage?"border-b-2 border-white":"border-b-2 border-gray-400"}`}></div>
          <p>
            {expanded ? description : description.slice(0, MAX_LENGTH) + (description.length > MAX_LENGTH ? "..." : "")}
          </p>

          {description.length > MAX_LENGTH && (
            <button
              className={`${isUserMessage?"text-white":"text-blue-500"} text-xs font-medium mt-1 hover:underline focus:outline-none`}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{createdat}</span>
          <button
            className={`flex items-center gap-1 text-xs font-medium transition-all ${
              upvoted ? "text-green-500" : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={handleUpvote}
          >
            <ThumbsUp size={14} />
            {upvoteCount}
          </button>
        </div>
      </div>
    </div>
  );
};
