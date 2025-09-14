import Image from "next/image";

const DATA = [
  { src: "reformLogos/1.svg", alt: "logo" },
  { src: "reformLogos/2.svg", alt: "logo" },
  { src: "reformLogos/3.svg", alt: "logo" },
  { src: "reformLogos/4.svg", alt: "logo" },
  { src: "reformLogos/5.svg", alt: "logo" },
  { src: "reformLogos/6.svg", alt: "logo" },
  { src: "reformLogos/7.svg", alt: "logo" },
  { src: "reformLogos/8.svg", alt: "logo" },
  { src: "reformLogos/9.svg", alt: "logo" },
  { src: "reformLogos/10.svg", alt: "logo" },
  { src: "reformLogos/11.svg", alt: "logo" },
  { src: "reformLogos/12.svg", alt: "logo" },
  { src: "reformLogos/13.svg", alt: "logo" },
  { src: "reformLogos/14.svg", alt: "logo" },
  { src: "reformLogos/15.svg", alt: "logo" },
  { src: "reformLogos/16.svg", alt: "logo" },
];

export default function Clients({ className = "" }) {
  return (
    <section className={`relative mx-5 mt-32 ${className}`}>
      <h1 className="top-0 mb-12 text-xl font-semibold tracking-tight lg:grid w-fit aspect-square lg:absolute lg:mb-0">
        <span className="flex flex-col">
          <span>SELECTED </span>
          <span>CLIENTS</span>
        </span>
      </h1>
      <div className="mx-auto grid grid-cols-2 place-content-between gap-5 md:grid-cols-4 lg:w-[70vw] lg:max-w-6xl">
        {DATA.map((logo) => {
          return (
            <div
              key={logo.src}
              className="grid aspect-video h-full w-full items-center lg:items-start justify-end nth-[2n]:justify-end nth-[2n+1]:justify-start md:aspect-square md:!justify-center md:nth-[4n]:!justify-end md:nth-[4n+1]:!justify-start"
            >
              <Image
                height={500}
                width={500}
                className="max-h-[8vw] w-auto contrast-200 saturate-0"
                src={logo.src}
                alt={logo.alt}
              ></Image>
            </div>
          );
        })}
      </div>
    </section>
  );
}
