"use client";
import { Menu, Minus, Smile } from "lucide-react";
import { useNav } from "../context/NavContext";
import NavTypewriter from "./NavTypewriter";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useState } from "react";
import Observer from "gsap/Observer";

gsap.registerPlugin(MorphSVGPlugin, Observer);

function MenuButton() {
  const container = useRef<HTMLButtonElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const tl2 = useRef<GSAPTimeline>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const navItem = useNav();

  // open split text animation
  useGSAP(
    () => {
      if (!tl.current) {
        tl.current = gsap.timeline({
          paused: true,
          onComplete: () => console.log("forward complete"),
          onReverseComplete: () => console.log("reverse complete"),
        });
        tl.current
          .to(".button__open", {
            yPercent: 100,
            ease: "power3.inOut",
            duration: 0.8,
          })
          .from(
            ".button__close",
            {
              yPercent: -100,
              ease: "power3.inOut",
              duration: 0.8,
            },
            "<"
          );
      }

      if (navItem.isOpen && tl.current) {
        tl.current.play(0);
      }
      if (!navItem.isOpen && tl.current) {
        tl.current.reverse();
      }
    },
    { scope: container, dependencies: [navItem.isOpen] }
  );

  //underline on button
  useGSAP(
    () => {
      if (!tl2.current) {
        tl2.current = gsap.timeline();

        tl2.current
          .to(".underline__out", {
            xPercent: 100,
            ease: "power4.inOut",
            duration: 1,
          })
          .to(
            ".underline__in",
            {
              xPercent: 100,
              ease: "power4.inOut",
              duration: 1,
              delay: 0.1,
            },
            "<"
          );
      }

      if (isHover && tl2.current) {
        tl2.current.play(0);
      }
      if (!isHover && tl2.current) {
        tl2.current.reverse();
      }
    },
    { scope: container, dependencies: [isHover] }
  );

  return (
    <button
      ref={container}
      onClick={() => {
        navItem.setIsOpen(!navItem.isOpen);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className="relative flex cursor-pointer touch-manipulation items-center justify-between text-amber-50"
    >
      <div className="grid h-fit grid-cols-1 grid-rows-1 items-center justify-center overflow-clip font-semibold">
        <span className="button__close col-start-1 row-start-1">
          <span className="flex">
            <Minus />
            <span>CLOSE</span>
          </span>
          <div
            aria-hidden
            className="relative mb-0.5 h-fit w-full overflow-clip"
          >
            <div className="underline__out h-0.5 w-full bg-amber-50"></div>
            <div className="underline__in absolute right-full bottom-0 h-0.5 w-full bg-amber-50"></div>
          </div>
        </span>
        <span className="button__open col-start-1 row-start-1">
          <span className="flex">
            <Menu className="open__svg" />
            {/* <ArrowRight className="open__svg2 hidden" /> */}
            <span>MENU</span>
          </span>
          <div
            aria-hidden
            className="relative mb-0.5 h-fit w-full overflow-clip"
          >
            <div className="underline__out h-0.5 w-full bg-amber-50"></div>
            <div className="underline__in absolute right-full bottom-0 h-0.5 w-full bg-amber-50"></div>
          </div>
        </span>
      </div>
    </button>
  );
}

export default function NavHeader({
  className,
  ...props
}: {
  className: string;
}) {
  const container = useRef<HTMLHeadElement>(null);
  const isOpenRef = useRef(false);
  const { isOpen, reverseComplete} = useNav();
  const tl = useRef<GSAPTimeline>(null);
  useGSAP(
    () => {
      isOpenRef.current = isOpen;

      const observer = Observer.create({
        type:'scroll',
        onDown: (e) => {
          if (!isOpenRef.current && reverseComplete.current) {
            gsap.to(container.current, {
              yPercent: -100,
              duration: 2,
              ease: "power4.out",
            });
          }
        },
        onUp: () => {
          gsap.to(container.current, {
            yPercent: 0,
            duration: 2,
            ease: "power4.out",
          });
        },
      });
      return () => {
        observer.kill();
      };
    },
    { scope: container, dependencies: [isOpen] }
  );

  return (
    <header
      ref={container}
      className={`flex h-18 items-center justify-between bg-black px-4 py-4 ${className}`}
      {...props}
    >
      <Smile size={32} className="text-amber-50" />
      <NavTypewriter />
      <MenuButton />
    </header>
  );
}
