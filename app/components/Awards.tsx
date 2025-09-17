"use client";
import { ArrowUpRight } from "lucide-react";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import CursorInvert from "./CursorInvert";
import Experience from "./Experience";
import { useState } from "react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: "variable",
});

const AWARDS = [
  { title: "Awwwards", amount: "8" },
  { title: "Apple", amount: "2" },
  { title: "CSSDA", amount: "12" },
  { title: "FWA", amount: "2" },
  { title: "Webby", amount: "1" },
];

export default function Awards() {
  const [hover, setHover] = useState(false);

  return (
    <section
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={`relative z-0 flex h-[120lvh] flex-col justify-center overflow-hidden bg-amber-50 outline-1 outline-black/30`}
    >
      <Experience />
      <CursorInvert hover={hover} className="pointer-events-none select-none" />
      <article className="z-10 pointer-events-none mx-5 my-auto grid-cols-12 md:mx-auto md:grid md:max-w-[80vw] md:gap-6 lg:max-w-[50vw]">
        <h2 className={` col-span-full flex flex-col leading-none`}>
          <span
            className={` ${instrumentSerif.className} text-6xl md:text-9xl`}
          >
            Awards
          </span>
          <span className="text-5xl tracking-tighter md:text-6xl">
            & Recognitions
          </span>
        </h2>
        <div className="col-span-full mt-18 flex grid-cols-12 flex-col gap-18 md:grid md:gap-0">
          <div className="col-span-5 flex flex-col gap-4">
            <Image
              height={200}
              width={200}
              className="w-[150px]"
              alt="runway logo"
              src={"/runway.svg"}
            ></Image>
            <p className="flex flex-col gap-0 text-2xl leading-none tracking-tighter">
              <span className={``}>Reform Collective</span>
              <span>Webby Winner {"'"}23</span>
            </p>
            <div>
              <a
                href="#"
                className="flex w-fit isolate pointer-events-auto items-center border-b-2 text-lg font-semibold tracking-tighter"
              >
                WEBBY AWARD WINNER <ArrowUpRight />
              </a>
              <p
                className={`mt-4 max-w-2/3 text-sm leading-none ${pixelifySans.className}`}
              >
                WEBSITES AND MOBILE SITES FINANCIAL SERVICES/BANKING 2024
              </p>
            </div>
          </div>
          <ul className="col-span-6 col-start-7 flex flex-col gap-2">
            {AWARDS.map((award) => {
              return (
                <li
                  className="flex w-full items-center justify-between tracking-tighter"
                  key={award.title}
                >
                  <span className="text-4xl">{award.title}</span>
                  <span className={`${pixelifySans.className} text-lg`}>
                    ({award.amount})
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </section>
  );
}
