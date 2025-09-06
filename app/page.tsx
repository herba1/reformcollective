import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import Hero from "./components/Hero";

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
        <div className="h-[8000px] bg-amber-50"></div>
        <Image src={"/idk.jpg"} width={500} height={500} alt="image" />
      </div>
    </main>
  );
}
