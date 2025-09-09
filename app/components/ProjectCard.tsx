"use client";

import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Observer from "gsap/Observer";

gsap.registerPlugin(Observer);

const pixelifySans = Pixelify_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

const DATA = [
  {
    title: "NERVANA",
    img: "",
    tags: ["Art Direction", "Branding", "Web Design", "Web Development"],
    subtitle: "THE PAIN FREE",
  },
];

export default function ProjectCard() {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);
  const cords = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      // GSAP animations go here
      const xTo = gsap.quickTo(imageRef.current, "x", {
        duration: 1,
        ease: "power2",
      });
      const yTo = gsap.quickTo(imageRef.current, "y", {
        duration: 1,
        ease: "power2",
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
          xTo(cords.current.x * 20);
          yTo(cords.current.y * 20);
        },
        onHover:()=>{
            gsap.to(imageRef.current,{
                scale:1.075,
                duration:0.5,
                ease:'power.out',
            })

        },
        onHoverEnd: () => {
          setTimeout(() => {
            gsap.to(imageRef.current,{
                scale:1,
                duration:1,
                ease:'power.out',
            })
            xTo(0);
            yTo(0);
          }, 50);
        },
      });
    },
    { scope: container }
  );

  return (
    <article
      ref={container}
      className="m-4 flex h-fit flex-col gap-4 overflow-clip rounded-xl bg-neutral-800 p-2"
    >
      <div className="image__container relative overflow-clip rounded-lg object-none">
        <Image
          ref={imageRef}
          width={2000}
          height={2000}
          className="image h-full w-full"
          src={"/hero.jpeg"}
          alt="img"
        ></Image>
      </div>
      <section
        ref={titleRef}
        className="leading-none tracking-tighter text-amber-50"
      >
        <h2 className="text-xl font-bold">NERVANA</h2>
        <h3 className="text-xl font-light">THE PAIN FREE ERA</h3>
      </section>
      <ul ref={tagsRef} className="mb-2 flex flex-wrap gap-2">
        {DATA[0].tags.map((element, index) => {
          return (
            <li
              className={`rounded-full p-2 text-sm text-amber-50 outline-1 ${pixelifySans.className}`}
              key={index}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
