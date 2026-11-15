export default function Pied() {
  return (
    <footer className="mx-auto mt-12 max-w-xl border-t border-[#1A2238]/20 px-5 py-8 text-sm">
      <nav className="flex flex-wrap gap-x-6 gap-y-1">
        <a href="/mentions-legales" className="py-2 underline">
          Mentions légales
        </a>
        <a href="/cgv" className="py-2 underline">
          CGV
        </a>
        <a href="/confidentialite" className="py-2 underline">
          Confidentialité
        </a>
      </nav>
      <p className="mt-2">© Fantômes</p>
    </footer>
  );
}
