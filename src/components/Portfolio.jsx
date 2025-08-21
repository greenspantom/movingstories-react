import { useRef } from "react";

const tvIds = [
  "1057609531","1057609239","1057608752","1057608154","1057607928","1057607661",
  "866700127","866699423","853618816","836161972","780709201","730439397",
  "724929957","689255913","671285310","654439280","654438810","654436948",
  "654436814","654436788","654435811","652501770","651905519","651902551",
  "651900001","651064416","645131677","645127298","643267591","643263265",
  "643208621","639450661","584631328","584631296","584631172","584630915",
  "584630783","584629353","584629325","584629177","584628932","584628779",
  "584628229","584627981"
];
const corpIds = ["666763803"];

function Carousel({ ids }) {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory bg-[#0b0b0b] rounded-xl p-4 flex gap-6"
        style={{ scrollbarWidth: "none" }}
      >
        {ids.map((id) => (
          <div key={id} className="min-w-full snap-start">
            <div className="video-wrap">
              <iframe
                src={`https://player.vimeo.com/video/${id}`}
                title={`Vimeo ${id}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full w-10 h-10 grid place-items-center"
        aria-label="Vorige"
      >
        ‹
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full w-10 h-10 grid place-items-center"
        aria-label="Volgende"
      >
        ›
      </button>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Portfolio</h2>

        <div className="mb-14">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">TV werk</h3>
          <Carousel ids={tvIds} />
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Corporate werk</h3>
          <Carousel ids={corpIds} />
        </div>
      </div>
    </section>
  );
}