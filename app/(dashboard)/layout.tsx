'use client';

import SideBar from '../components/organsms/SideBar/SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='flex h-screen w-full mx-auto  gap-5 '>
        <SideBar />
        <div className='max-w-[1440px] w-full mx-auto'>{children}</div>
      </div>
    </>
  );
}
