
"use client";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./components/organsms/SideBar/SideBar";
import { usePathname } from "next/navigation";
import MobileSideBar from "./components/organsms/SideBar/MobileSideBar";


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  const excludeSideBar = ["/login", "/signUp"];

  return (
    <html lang='en'>
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F4F0] text-[#201F24] flex `}
      >
        <div className="flex justify-between gap-5 max-w-[1440px] w-full">
          {!excludeSideBar.includes(pathName) && <SideBar />}

          {children}
       
          {!excludeSideBar.includes(pathName) && <MobileSideBar />}
    
        </div>

      </body>
    </html>
  );
}
