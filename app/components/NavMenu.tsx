import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import { useNav } from "../context/NavContext";
import { useLayoutEffect, useRef } from "react";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

const menuItems = [
  { title: "Our Work", subtitle: "This is some subtext" },
  { title: "About Us", subtitle: "What we can do for you" },
  { title: "Reform Nova", subtitle: "Learn more about us" },
];

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
  // console.log(item);

  useLayoutEffect(() => {
    if (!container.current) return;
    item.setMenuHeight(container.current.offsetHeight.toString());
  }, [item.menuHeight]);

  return (
    <menu
      ref={container}
      className={`navmenu mb-[-160%] grid grid-cols-4 gap-4 gap-y-10 bg-black px-4 py-10 text-amber-50 ${className}`}
      {...props}
    >
      <ul className="col-span-full w-full">
        {menuItems.map((item, index) => (
          <li key={index} className="grid">
            <span className="flex">
              <h1
                className={`${instrumentSerif.className} text-6xl text-nowrap`}
              >
                {item.title}
              </h1>
              <ArrowRight />
            </span>
            <p
              className={`${pixelifySans.className} col-span-2 text-sm text-orange-400`}
            >
              {item.subtitle}
            </p>
          </li>
        ))}
      </ul>
      <button className="col-span-full flex touch-manipulation grid-cols-2 items-center justify-between rounded-full bg-red-600 px-6 py-5">
        <span></span>
        <span className={`w-full text-xl font-bold`}>LET`S CHAT</span>
        <ArrowUpRight />
      </button>
      <ul className="space-y-2">
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
      </ul>
    </menu>
  );
}
