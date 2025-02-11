import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { Appbar } from "../components/Appbar";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <Appbar />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
