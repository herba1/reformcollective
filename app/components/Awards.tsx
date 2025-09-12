import { ArrowUpRight } from "lucide-react";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: "variable",
});

const AWARDS = [
  { title: "Awwwards", amount: "8" },
  { title: "Apple", amount: "2" },
  { title: "CSSDA", amount: "12" },
  { title: "FWA", amount: "2" },
  { title: "Webby", amount: "1" },
];

export default function Awards() {
  return (
    <section className="h-[150lvh] outline-1 outline-black/30">
      <article className="mx-5 md:grid">
        <h2 className={`flex flex-col text-6xl leading-none`}>
          <span className={` ${instrumentSerif.className}`}>Awards</span>
          <span className="tracking-tighter">& Recognitions</span>
        </h2>
        <div className="flex flex-col gap-18 mt-18">
          <div className="flex flex-col gap-2">
            <Image
              height={200}
              width={200}
              className="h-[clamp(50px, 15vw, 500px)]"
              alt="runway logo"
              src={"/runway.svg"}
            ></Image>
            <p className="flex flex-col text-3xl tracking-tighter">
              <span>Reform Collective</span>
              <span>Webby Winner {"'"}23</span>
            </p>
            <div>
              <a href="#" className="flex w-fit items-center border-b-2 text-lg">
                WEBBY AWARD WINNER <ArrowUpRight />
              </a>
              <p
                className={`mt-4 text-sm leading-none ${pixelifySans.className}`}
              >
                WEBSITES AND MOBILE SITES FINANCIAL SERVICES/BANKING 2024
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {AWARDS.map((award) => {
              return (
                <li
                  className="flex w-full items-center justify-between"
                  key={award.title}
                >
                  <span className="text-4xl">{award.title}</span>
                  <span className={`${pixelifySans.className}`}>
                    ({award.amount})
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </section>
  );
}
