import { ArrowDown, Globe } from "lucide-react";
import Image from "next/image";
import { Instrument_Serif, Pixelify_Sans, Inter } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      id="main__container"
      className="main__container ounded-3xl scale- isolate z-10 col-span-full overflow-hidden relative bg-black"
    >
      <div id="main__content" className={`grid min-h-screen main__content overflow-clip bg-amber-50 font-sans`}>
        <div className="col-span-full flex h-svh flex-col overflow-x-hidden">
          <div className="relative grid w-full max-w-full grow object-cover outline-1">
            <Image
              src={"/hero.jpeg"}
              className="absolute top-0 left-0 z-0 h-full w-full object-cover"
              alt="idk"
              width={500}
              height={500}
              priority
            />
            <div className="z-10 w-full self-end overflow-hidden">
              <p
                className={`animate-marquee flex w-max self-end text-8xl tracking-tighter text-nowrap text-black ${inter.className}`}
              >
                REFORM COLLECTIVE
                <Globe size={32} />
                REFORM COLLECTIVE
                <Globe size={32} />
              </p>
            </div>
          </div>
          <div
            className={`flex justify-between bg-amber-50 px-4 py-6 ${pixelifySans.className} `}
          >
            <span>EST.2015</span>
            <span className="flex">
              (SCROLL DOWN <ArrowDown />)
            </span>
          </div>
        </div>
        <div className="h-100 bg-amber-50"></div>
      </div>
    </main>
  );
}
