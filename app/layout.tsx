"use client";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import NavHeader from "./components/NavHeader";
import NavMenu from "./components/NavMenu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { GSDevTools } from "gsap/GSDevTools";
import { useNav, NavProvider } from "./context/NavContext";
import { ReactLenis } from "lenis/react";
import Loader from "./components/Loader";

gsap.registerPlugin(GSDevTools);

export const inter = Inter({
  subsets: ["latin"],
  weight:'variable',
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight:'variable',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const container = useRef(null);


  return (
    <html lang="en">
      <body>
        <ReactLenis root>
          <div
            ref={container}
            className={`antialiased bg-black grid grid-cols-4 relative root-layout ${inter.className}`}
          >
            <Loader></Loader>
            <NavProvider>
              <NavHeader className="sticky z-50 col-span-full top-0 h-16" />
              <NavMenu className="sticky z-0 top-16 col-span-full" />
              {children}
            </NavProvider>
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}
