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
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="text-red-600 font-black text-2xl tracking-tight leading-none uppercase">
              Wheels Below Retail
            </div>
            <div className="text-zinc-400 text-xs tracking-[0.2em] uppercase mt-1">
              Forgiato Authorized Dealer
            </div>
          </div>

          {/* Forgiato badge */}
          <div className="flex items-center gap-3">
            <div className="border border-red-700 rounded px-3 py-1.5 text-center">
              <div className="text-white text-xs font-semibold tracking-widest uppercase">Authorized</div>
              <div className="text-red-500 text-sm font-black tracking-wider uppercase">Forgiato</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
