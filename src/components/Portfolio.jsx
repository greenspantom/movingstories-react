import { useEffect, useState, useRef } from "react";

/** Zet gewone URL om naar embed-URL (Vimeo + YouTube) */
function toEmbed(url) {
  try {
    if (!url) return url;
    // Vimeo: vimeo.com/123456789 -> player.vimeo.com/video/123456789
    if (url.includes("vimeo.com/") && !url.includes("player.vimeo.com")) {
      const parts = url.split("?")[0].split("/").filter(Boolean);
      const id = parts.pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    // YouTube: watch URL -> embed
    if (url.includes("youtube.com/watch")) {
      const u = new URL(url);
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    // YouTube short: youtu.be/ID -> embed
    if (url.includes("youtu.be/")) {
      const id = url.split("/").pop().split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  } catch {
    return url;
  }
}

function useUrlList(path) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch(path, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Kon ${path} niet laden (${r.status})`);
        return r.text();
      })
      .then((text) => {
        if (!isMounted) return;
        const list = text
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter((s) => s && !s.startsWith("#")); // lege regels & comments overslaan
        setUrls(list);
      })
      .catch((e) => isMounted && setError(e.message))
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [path]);

  return { urls, loading, error };
}

function Carousel({ urls }) {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (!urls?.length) {
    return <p className="text-gray-400">Nog geen videos in deze lijst.</p>;
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory bg-[#0b0b0b] rounded-xl p-4 flex gap-6"
        style={{ scrollbarWidth: "none" }}
      >
        {urls.map((url, i) => (
          <div key={i} className="min-w-full snap-start">
            <div className="video-wrap">
              <iframe
                src={toEmbed(url)}
                title={`video-${i}`}
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
  const { urls: tvUrls, loading: tvLoad, error: tvErr } = useUrlList("/tv.txt");
  const { urls: corpUrls, loading: cLoad, error: cErr } = useUrlList("/corporate.txt");

  return (
    <section id="portfolio" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Portfolio</h2>

        <div className="mb-14">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">TV werk</h3>
          {tvLoad ? <p className="text-gray-400">Laden…</p> : tvErr ? <p className="text-red-400">{tvErr}</p> : <Carousel urls={tvUrls} />}
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Corporate werk</h3>
          {cLoad ? <p className="text-gray-400">Laden…</p> : cErr ? <p className="text-red-400">{cErr}</p> : <Carousel urls={corpUrls} />}
        </div>
      </div>
    </section>
  );
}