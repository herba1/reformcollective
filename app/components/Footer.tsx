"use client";
import { SquareAsterisk } from "lucide-react";
import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import { NavLinks } from "./NavMenu";
import { title } from "process";

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
    <footer className="mt-32 bg-amber-50">
      <div className="mx-5 grid lg:grid-cols-12 lg:gap-5 lg:items-end lg:justify-start grid-cols-2 gap-y-2">
        <a href="#" className="col-span-2 row-start-1 lg:col-span-1 ">
          <SquareAsterisk size={52} />
        </a>

        <ul className="col-span-2 row-start-2 flex lg:col-start-1  flex-col">
          {DATA.links.map((e, i) => {
            return (
              <li key={i}>
                <a href="#" className="leading-none tracking-tighter">{e.title}</a>
              </li>
            );
          })}
        </ul>

        <ul className="row-span-2 self-end row-start-3 lg:row-start-2 lg:col-start-12 lg:col-span-1 lg:row-span-1 flex flex-col lg:pb-0 pb-2 gap-1.5">
          {DATA.socials.map((e, i) => {
            return (
              <li
                className={`text-xs leading-none lg:text-right ${pixelifySans.className}`}
                key={i}
              >
                <a href="#">{e.title}</a>
              </li>
            );
          })}
        </ul>

        <div className="col-span-1 flex -ml-[5vw] lg:leading-none lg:-ml-[0vw] flex-col lg:col-span-4 lg:row-start-2 lg:flex-row lg:col-start-3 lg:gap-1 lg:text-[1.7vw] lg:font-medium leading-snug tracking-tighter">
          <span>Ready to build</span>
          <span>something with us?</span>
        </div>

        <NavLinks
          className="col-span-1 -ml-[5vw] lg:-ml-[7vw] lg:-mb-[0.8vw] lg:col-span-4 lg:col-start-7 lg:row-start-2"
          textClassName=" text-[13vw] lg:text-[7.2vw]  "
          item={{ title: "Lets Chat", subtitle: ``, href: "" }}
        />

        <div className="col-span-2 lg:col-span-full lg:row-start-3">
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
