import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import Hero from "./components/Hero";
import Button from "./components/Button";
import { ArrowUpRight } from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      id="main__container"
      className="main__container relative isolate z-10 col-span-full origin-top overflow-hidden bg-black"
    >
      <div
        id="main__content"
        className={`main__content grid origin-bottom overflow-clip bg-amber-50 font-sans`}
      >
        <Hero />
        <div className="grid h-svh place-items-center bg-amber-50">
          <Button>
            <span className="flex items-center justify-center">
              CONTACT US <ArrowUpRight />
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
}
