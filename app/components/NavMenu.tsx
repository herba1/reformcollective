import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import { useNav } from "../context/NavContext";
import { useLayoutEffect, useRef } from "react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Observer from "gsap/Observer";
import { useState } from "react";
import Button from "./Button";

gsap.registerPlugin(ScrambleTextPlugin, Observer);

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

const menuItems = [
  { title: "Our Work", subtitle: "This is some subtext", href: "#" },
  { title: "About Us", subtitle: "What we can do for you", href: "#" },
  { title: "Reform Nova", subtitle: "Learn more about us", href: "#" },
];

type MenuItem = {
  title: string;
  subtitle: string;
  href: string;
};

const menuFooter = [
  { title: "LINKEDIN", href: "#" },
  { title: "AWWWARDS", href: "#" },
  { title: "INSTAGRAM", href: "#" },
  { title: "X / TWITTER", href: "#" },
  { title: "DRIBBLE", href: "#" },
];

export default function NavMenu({
  className,
  ...props
}: {
  className: string;
}) {
  const container = useRef<HTMLMenuElement>(null);
  const item = useNav();
  useLayoutEffect(() => {
    if (container.current)
      item.setMenuHeight(container.current.offsetHeight.toString());
  }, );

  useLayoutEffect(() => {
    if (!container.current) return;
    const handleResize = () => {
      if (container.current)
        item.setMenuHeight(container.current.offsetHeight.toString());
    };
    window.addEventListener("resize", handleResize);
  }, [item]);

  return (
    <menu
      ref={container}
      className={`navmenu mx-auto mb-[-200%] grid h-fit w-full grid-cols-4 gap-4 gap-y-10 bg-black px-4 py-10 text-amber-50 sm:py-10 xl:max-w-[75vw] ${className}`}
      {...props}
    >
      <ul className="col-span-full w-full">
        {menuItems.map((item, index) => (
          <NavLinks item={item} key={index} />
        ))}
      </ul>
{/*  */}
        <Button
          btnClassName="bg-red-600 grid place-items-center "
          className=" sm:hidden col-span-full "
          
        >
          <span className="flex justify-between items-center w-full">
            <span></span>
            <span className={`text-xl font-bold`}>LET`S CHAT</span>
            <ArrowUpRight />
          </span>
        </Button>

      <ul className="col-span-full flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-end">
        {menuFooter.map((e, i) => {
          return (
            <li
              className={`${pixelifySans.className} text-xs text-red-600`}
              key={i}
            >
              <a className="text-nowrap" href={e.href}>
                {e.title}
              </a>
            </li>
          );
        })}
        <Button
          btnClassName="bg-red-600"
          className="col-span-full hidden touch-manipulation grid-cols-2 sm:flex"
        >
          <span className="flex w-full justify-between">
            <span className={`w-full text-xl font-bold`}>LET`S CHAT</span>
            <ArrowUpRight />
          </span>
        </Button>
      </ul>
    </menu>
  );
}

function NavLinks({ item }: { item: MenuItem }) {
  const container = useRef<HTMLLIElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const tl2 = useRef<GSAPTimeline>(null);
  const [hover, setHover] = useState<boolean>(false);

  useGSAP(
    () => {
      if (!tl.current || !tl2.current) {
        tl.current = gsap.timeline({});
        tl2.current = gsap.timeline({});

        tl.current
          .to([".title", ".subtitle"], {
            x: 15,
            ease: "power1.inOut",
            duration: 0.5,
          })
          .to(
            ".arrow",
            {
              rotate: -45,
              ease: "power1.inOut",
              duration: 0.5,
            },
            "<"
          );

        tl2.current.to(".subtitle", {
          scrambleText: {
            text: "{original}",
            revealDelay: 0.25,
          },
          duration: 0.6,
        });
      }

      if (hover) {
        if (tl.current.isActive()) {
          tl.current.play();
        } else {
          tl.current.play(0);
        }
        tl2.current.play(0);
      }
      if (!hover) {
        tl.current.reverse();
      }
    },
    { scope: container, dependencies: [hover] }
  );

  return (
    <li
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      ref={container}
      className="grid w-fit overflow-x-clip"
    >
      <a href={item.href}>
        <span className="flex gap-2">
          <h1
            className={`${instrumentSerif.className} title text-6xl text-nowrap sm:text-[clamp(3.75rem,8vw,8rem)]`}
          >
            {item.title}
          </h1>
          <ArrowRight className="arrow" size={28} />
        </span>
        <p
          className={`${pixelifySans.className} subtitle col-span-2 text-sm text-orange-400`}
        >
          {item.subtitle}
        </p>
      </a>
    </li>
  );
}
