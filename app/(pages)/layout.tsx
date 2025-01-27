"use client";

export default function RootLayout({ children }: { children: any }) {
  return (
    <div className="w-full h-screen    mx-auto flex items-start lg:items-center">
      {children}
    </div>
  );
}
