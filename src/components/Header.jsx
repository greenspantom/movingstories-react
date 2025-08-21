export default function Header() {
  return (
    <header className="bg-black/70 backdrop-blur sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
        <nav>
          <ul className="flex gap-6 text-sm md:text-base list-none m-0 p-0">
            <li><a className="hover:text-blue-400" href="#home">Home</a></li>
            <li><a className="hover:text-blue-400" href="#info">Info</a></li>
            <li><a className="hover:text-blue-400" href="#portfolio">Portfolio</a></li>
            <li><a className="hover:text-blue-400" href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}