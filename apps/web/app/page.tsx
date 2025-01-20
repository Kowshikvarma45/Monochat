"use client"
import { SpotlightCard } from "../components/Spotlightcard";
import { BlurText } from "../components/Blurtext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600
 text-white flex flex-col items-center">
      <header className="text-center mt-16 ml-1">
        <BlurText 
          text="Welcome to Logchat!"
          delay={40}
          animateBy="letters"
          direction="top"
          className="text-6xl flex justify-center font-bold"
        />
        <BlurText
          text="Stay connected with your friends and join the fun!"
          delay={50}
          animateBy="words"
          direction="top"
          className="mt-2 flex justify-center text-xl"
        />
      </header>
      <div className="flex justify-center mt-10 hover:scale-105">
      <SpotlightCard className="w-150 p-10 py-15 text-center" spotlightColor="rgba(0, 229, 255, 0.2)">
        <h2 className="text-2xl font-bold mb-4 text-white">Get Started</h2>
        <div className="w-[200px] h-[200px] ml-4 bg-cover bg-center bg-no-repeat"style={{ backgroundImage: "url('/jumbopng.png')" }}>
        </div>
        <p className="text-gray-300 mb-5">Choose an option to start chatting:</p>
        <div className="flex flex-col gap-4">
          <button className="w-full border-2 border-white text-white py-2 rounded-lg hover:bg-gradient-to-r from-teal-800 via-blue-800 to-purple-800
 hover:scale-105 transition"  onClick={()=>{
  router.push("./Join")
 }}>
            Join a Room
          </button>
          <button className="w-full border-2 border-white text-white py-2 rounded-lg hover:bg-gradient-to-r from-teal-800 via-blue-800 to-purple-900
 hover:scale-105 transition" onClick={()=>{
  router.push("./Create")
 }}>
            Create a Room
          </button>
        </div>
      </SpotlightCard>
      </div>
    </div>
      <footer className="bg-black py-6 text-center">
        <p className="text-white">
          Made with ❤️ by kowshik varma kucharallapati!
        </p>
      </footer>
    </div>
      );
}
