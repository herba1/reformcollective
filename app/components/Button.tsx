"use client";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(Observer);

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  const container = useRef<HTMLButtonElement>(null);
  const mainElement = useRef<HTMLDivElement>(null);
  const cords = useRef({
    x: 0,
    y: 0,
  });
  const hoverRef = useRef(false);

  useGSAP(
    () => {
      if (!mainElement.current) {
        return;
      }
      const outlines = container.current?.querySelectorAll(".outlines");
      const splitTl = gsap.timeline({ paused: true });
      splitTl.to([".text__top", ".text__bottom"], {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 0.7,
      });
      outlines?.forEach((e) => {
        gsap.set(e, {
          scale: 0.98,
        });
      });

      Observer.create({
        target: ".button__main",
        onHover: () => {
          splitTl.play(0);
        },
        onHoverEnd: () => {
          splitTl.reverse();
          gsap.to(mainElement.current, {
            overwrite: true,
            immediateRender: true,
            ease: "power4.out",
            duration: 1,
            x: cords.current.x,
            y: cords.current.y,
          });
          outlines?.forEach((outline) => {
            gsap.to(outline, {
              immediateRender: true,
              overwrite: true,
              duration: 1,
              ease: "power4.out",
              y: 0,
              x: 0,
            });
          });
        },
        onMove: (e) => {
          if (!hoverRef.current) return;
          if (mainElement.current && e.x && e.y) {
            const left = mainElement.current.getBoundingClientRect().left;
            const top = mainElement.current.getBoundingClientRect().top;
            const height = mainElement.current.getBoundingClientRect().height;
            const width = mainElement.current.getBoundingClientRect().width;
            cords.current.x = ((e.x - (left + width / 2)) / width) * 2;
            cords.current.y = ((e.y - (top + height / 2)) / height) * 2;
          }
          gsap.to(mainElement.current, {
            ease: "power4.out",
            duration: 2,
            x: cords.current.x * -4,
            y: cords.current.y * -4,
          });

          outlines?.forEach((outline, index) => {
            gsap.to(outline, {
              ease: "power4.out",
              duration: 2,
              y: cords.current.y * index * 4,
              x: cords.current.x * index * 4,
            });
          });
        },
      });
    },
    { scope: container }
  );

  useGSAP(() => {}, { scope: container, dependencies: [] });

  return (
    <button
      {...props}
      ref={container}
      className={`relative rounded-full bg-transparent leading-none font-semibold tracking-tight text-amber-50 ${className}`}
    >
      <div
        ref={mainElement}
        className="button__main relative top-0 left-0 z-40 grid h-full w-full grid-cols-1 grid-rows-1 rounded-full bg-black px-8 py-8"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <span className="relative grid h-fit w-fit grid-cols-1 grid-rows-1 overflow-clip">
          <span aria-hidden className="text__top relative z-50 col-start-1 row-start-1 inline-block">
            {children}
          </span>
          <span className="text__bottom relative z-50 col-start-1 row-start-1 inline-block translate-y-full">
            {children}
          </span>
        </span>
      </div>
      <div
        aria-hidden
        className="outlines pointer-events-none absolute top-0 left-0 z-10 h-full w-full rounded-full outline-1 outline-red-500"
      ></div>
      <div
        aria-hidden
        className="outlines pointer-events-none absolute top-0 left-0 z-10 h-full w-full rounded-full outline-1 outline-blue-500"
      ></div>
      <div
        aria-hidden
        className="outlines pointer-events-none absolute top-0 left-0 z-10 h-full w-full rounded-full outline-1 outline-green-500"
      ></div>
      <div
        aria-hidden
        className="outlines pointer-events-none absolute top-0 left-0 z-10 h-full w-full rounded-full outline-1 outline-orange-500"
      ></div>
    </button>
  );
}
