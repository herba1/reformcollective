import { Instrument_Serif } from "next/font/google";
import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Awards() {
  return (
    <section className="h-[150lvh] outline-1 outline-black/30">
      <article className="mx-5">
        <h2 className={`flex flex-col text-6xl leading-none`}>
          <span className={` ${instrumentSerif.className}`}>Awards</span>
          <span className="tracking-tighter">& Recognitions</span>
        </h2>
        <div>
          <div>
            <Image
              height={100}
              width={100}
              alt="runway logo"
              src={"/runway.svg"}
            ></Image>
            <p></p>
          </div>
          <ul></ul>
        </div>
      </article>
    </section>
  );
}
