"use client";
import { SquareAsterisk } from "lucide-react";
import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import { NavLinks } from "./NavMenu";

const pixelifySans = Pixelify_Sans({
  weight: "variable",
  subsets: ["latin"],
});

const DATA = {
  links: [
    { key: 1, title: "OUR WORK", href: "#" },
    { key: 2, title: "ABOUT US", href: "#" },
    { key: 3, title: "REFORM NOVA", href: "#" },
    { key: 4, title: "CONTACT US", href: "#" },
    { key: 5, title: "CAREERS", href: "#" },
  ],
  socials: [
    { title: "LINKEDIN", key: 1, href: "#" },
    { title: "INSTAGRAM", key: 2, href: "#" },
    { title: "AWWWARDS", key: 3, href: "#" },
    { title: "X", key: 4, href: "#" },
    { title: "DRIBBLE", key: 5, href: "#" },
  ],
};
export default function Footer() {
  return (
    <footer className="mt-32 md:mt-[7vw] bg-amber-50">
      <div className="mx-5 grid grid-cols-2 gap-y-2 lg:grid-cols-12 lg:items-end lg:justify-start lg:gap-5">
        <a href="#" className="col-span-2 row-start-1 lg:col-span-1">
          <SquareAsterisk size={52} />
        </a>

        <ul className="col-span-2 lg:text-[1.1vw] row-start-2 flex flex-col lg:col-start-1">
          {DATA.links.map((e, i) => {
            return (
              <li key={i}>
                <a href="#" className="leading-none tracking-tighter">
                  {e.title}
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="row-span-2 row-start-3 flex flex-col gap-1.5 self-end pb-2 lg:col-span-1 lg:col-start-12 lg:row-span-1 lg:row-start-2 lg:pb-0">
          {DATA.socials.map((e, i) => {
            return (
              <li
                className={`text-xs leading-none lg:text-[0.85vw] lg:text-right ${pixelifySans.className}`}
                key={i}
              >
                <a href="#">{e.title}</a>
              </li>
            );
          })}
        </ul>

        <div className="col-span-1 -ml-[5vw] flex flex-col leading-snug tracking-tighter lg:col-span-4 lg:col-start-3 lg:row-start-2 lg:-ml-[0vw] lg:flex-row lg:gap-1 lg:text-[1.7vw] lg:leading-none lg:font-medium">
          <span>Ready to build</span>
          <span>something with us?</span>
        </div>

        <NavLinks
          className="col-span-1 -ml-[5vw] lg:col-span-4 lg:col-start-7 lg:row-start-2 lg:-mb-[0.8vw] lg:-ml-[7vw]"
          textClassName=" text-[13vw] lg:text-[7.2vw]  "
          item={{ title: "Lets Chat", subtitle: ``, href: "" }}
        />

        <div className="col-span-2 pointer-events-none select-none lg:col-span-full lg:row-start-3">
          <Image
            src={"/reformlogo.svg"}
            alt="ReformCollective Logo"
            height={1000}
            width={1000}
            className="h-full w-full"
          ></Image>
        </div>
      </div>
    </footer>
  );
}
