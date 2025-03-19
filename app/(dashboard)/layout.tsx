"use client";

import { usePathname } from "next/navigation";
import SideBar from "../components/organsms/SideBar/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideSidebarRoutes = [ "/signup"];
  const showSidebar = !hideSidebarRoutes.includes(pathname);
  return (
    <>
      <div className="flex h-screen w-full mx-auto  gap-5 ">
        {showSidebar && <SideBar />}
        <div className="max-w-[1440px] w-full mx-auto">{children}</div>
      </div>
    </>
  );
}
