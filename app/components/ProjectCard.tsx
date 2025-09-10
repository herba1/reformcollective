"use client";

import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Observer from "gsap/Observer";

gsap.registerPlugin(Observer);

const pixelifySans = Pixelify_Sans({
  weight: ["400"],
  subsets: ["latin"],
});


type ProjectCardType = {
  title: string;
  src: string;
  href: string;
  tags: string[];
  subtitle?: string;
  className?: string;
  imgClassName?: string;
  variant?:'default' | 'compact'
};

export default function ProjectCard({
  className = "",
  imgClassName = "",
  title,
  src,
  href,
  tags,
  subtitle,
  variant = "default",
}: ProjectCardType) {
  const container = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);
  const cords = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState<boolean>(false);

  useGSAP(
    () => {
      // GSAP animations go here
      const xTo = gsap.quickTo(imageRef.current, "x", {
        duration: 1,
        ease: "power4.out",
      });
      const yTo = gsap.quickTo(imageRef.current, "y", {
        duration: 1,
        ease: "power4.out",
      });

      Observer.create({
        target: container.current,
        onMove: (e) => {
          const left = imageRef.current?.getBoundingClientRect().left ?? 0;
          const top = imageRef.current?.getBoundingClientRect().top ?? 0;
          const width = imageRef.current?.getBoundingClientRect().width ?? 0;
          const height = imageRef.current?.getBoundingClientRect().height ?? 0;
          if (e.x && e.y) {
            cords.current.x = (e.x - (left + width / 2)) / width;
            cords.current.y = (e.y - (top + height / 2)) / height;
          }
          xTo(cords.current.x * 15);
          yTo(cords.current.y * 15);
        },
        onHoverEnd: () => {
          setTimeout(() => {
            xTo(0);
            yTo(0);
          }, 50);
        },
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      if (hover) {
        gsap.to(imageRef.current, {
          overwrite: "auto",
          scale: 1.05,
          duration: 0.5,
          ease: "power4.out",
        });
      }
      if (!hover) {
        gsap.to(imageRef.current, {
          overwrite: "auto",
          scale: 1,
          duration: 1,
          ease: "power4.out",
        });
      }
    },
    { scope: container, dependencies: [hover] }
  );

  return (
    <a
      href={href}
      ref={container}
      className={`flex h-full  flex-col gap-4 overflow-clip rounded-xl bg-neutral-800 p-2 ${className}`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className={`image__container relative overflow-clip rounded-lg object-none ${imgClassName}`}>
        <Image
          ref={imageRef}
          width={2000}
          height={2000}
          className={`image h-full w-full object-cover`}
          src={src}
          alt="img"
        ></Image>
      </div>
      <div className="mb-4 mt-2  h-fit flex flex-col flex-wrap justify-between gap-4 lg:flex-row lg:items-center">
        <section
          ref={titleRef}
          className="gap-2  h-fit leading-none tracking-tighter text-amber-50 sm:flex"
        >
          <h2 className="text-xl font-bold">{title}</h2>
          <h3 className={`text-xl max-w-4/5 font-light ${variant==='compact'?'md:hidden':''}`}>{subtitle}</h3>
        </section>
        <ul ref={tagsRef} className="flex flex-wrap gap-2">
          {tags.map((element, index) => {
            return (
              <li
                className={`rounded-full px-2 py-1 text-sm text-amber-50 outline-1 ${pixelifySans.className}`}
                key={index}
              >
                {element}
              </li>
            );
          })}
        </ul>
      </div>
    </a>
  );
}
