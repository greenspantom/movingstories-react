export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[70vh] min-h-[380px] overflow-hidden">
      <iframe
        src="https://player.vimeo.com/video/903662035?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-semibold drop-shadow-xl text-center px-4">
          Telling stories that matter
        </h1>
      </div>
    </section>
  );
}