export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Contact</h2>
        <form
          action="mailto:tim@movingstories.be"
          method="post"
          encType="text/plain"
          className="space-y-4 bg-[#0b0b0b] p-6 rounded-xl border border-gray-800"
        >
          <input type="text" name="Naam" placeholder="Naam" required className="w-full rounded-md border border-gray-700 bg-black text-gray-200 p-2" />
          <input type="email" name="Email" placeholder="E-mail" required className="w-full rounded-md border border-gray-700 bg-black text-gray-200 p-2" />
          <textarea name="Bericht" rows="5" placeholder="Bericht" required className="w-full rounded-md border border-gray-700 bg-black text-gray-200 p-2"></textarea>
          <button type="submit" className="w-full rounded-md bg-white text-black py-2 font-semibold">Verstuur</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-3">
          Of stuur rechtstreeks een e-mail: <a href="mailto:tim@movingstories.be" className="underline">tim@movingstories.be</a>
        </p>
      </div>
    </section>
  );
}