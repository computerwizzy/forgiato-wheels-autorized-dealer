export default function SiteHeader() {
  return (
    <>
      {/* Red announcement bar */}
      <div className="bg-red-700 text-white text-sm py-2 px-4 text-center font-bold tracking-widest uppercase">
        <a href="tel:2056441082" className="hover:text-red-200 transition-colors">
          Call 205-644-1082
        </a>
      </div>

      {/* Main header */}
      <header className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <span className="text-red-600 font-black text-2xl tracking-tight uppercase leading-none">
              Wheels Below Retail
            </span>
            <span className="hidden sm:block text-zinc-600 text-xl font-light">|</span>
            <span className="text-white font-semibold text-sm tracking-[0.15em] uppercase">
              Forgiato Authorized Dealer
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
