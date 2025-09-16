import { ArrowUpRight } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import ReformNovaLogo from "./ReformNovaLogo";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export default function ReformNova() {
  const marqueeElements = Array.from({ length: 20 }, (_, index) => (
    <span key={index} className="flex items-center">
      EQUITY OVER CASH
      <span className="mx-2 block h-2 w-2 rounded-full bg-amber-50 text-transparent"></span>
    </span>
  ));

  return (
    <section className="relative mt-32 h-[100vh] min-h-fit w-full overflow-y-clip bg-black md:h-fit">
      <div aria-hidden className="absolute top-0 bottom-0 z-0 select-none">
        <Image
          width={2000}
          height={2000}
          alt="static"
          src={"/static.webp"}
          className="z-50 h-full w-full object-cover"
        ></Image>
      </div>
      <div
        aria-hidden
        className="absolute top-0 right-0 bottom-0 left-0 z-10 mix-blend-overlay select-none"
      >
        <Image
          width={2000}
          height={2000}
          alt="blob of matter"
          src={"/blob.gif"}
          className="z-0 mx-auto h-full w-full object-contain blur-[1px] brightness-50 contrast-200 invert saturate-0"
          unoptimized
        ></Image>
      </div>
      <div
        aria-hidden
        className="marquee__container mt-2 w-[100vw] overflow-hidden"
      >
        <div className="animate-marquee-slow flex w-max items-center text-amber-50">
          {marqueeElements}
        </div>
      </div>
      <div className="relative z-30 grid-cols-12 gap-5 md:grid">
        <div className="col-span-full col-start-3 mx-5 mt-16 text-amber-50 md:mx-0 md:mt-32">
          <h1
            className={`flex flex-col text-4xl leading-none md:text-5xl ${instrumentSerif.className}`}
          >
            <span>CREATE YOUR VISION.</span>
            <span>EXTEND YOUR RUNWAY.</span>
          </h1>
          <p className="mt-5 max-w-sm text-sm uppercase">
            Reform Nova isn’t just another service. Nova is a partnership. We
            trade world-class design, development, and brand strategy for
            equity, helping startups move faster, stand out, and scale smarter.
            No upfront agency fees. just the creative firepower you need to
            launch, backed by a team that’s as invested in your success as you
            are.
          </p>
          <a
            href="#"
            className="mt-5 flex w-fit items-center gap-1 border-b-1 font-semibold tracking-tighter"
          >
            LEARN MORE <ArrowUpRight></ArrowUpRight>
          </a>
          <div className="relative mt-120 mb-24 border-t-2 md:mt-60">
            <ReformNovaLogo className="absolute -right-10 bottom-full z-0 h-[75vw] translate-y-2/20 select-none md:-right-[6vw] md:h-[40vw]" />
            <div className="mt-4 flex justify-end md:mt-0 md:justify-start">
              <Image
                height={100}
                alt="REFORM NOVA"
                src={"novalogo.svg"}
                width={100}
                className="h-[6vw] w-auto max-w-3xs"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
