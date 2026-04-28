export default function SiteHeader() {
  return (
    <>
      {/* Red top bar — matches Wheels Below Retail store */}
      <div className="bg-red-700 text-white py-2 px-4 text-center">
        <a
          href="tel:2056441082"
          className="text-sm font-bold tracking-widest uppercase hover:text-red-200 transition-colors"
        >
          CALL 205-644-1082
        </a>
      </div>

      {/* White header — matches store layout */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

          {/* Logo text — replicates Wheels Below Retail style */}
          <div className="leading-tight">
            <div className="text-black font-black text-xl tracking-tight uppercase">WHEELS</div>
            <div className="text-black font-normal text-xs tracking-widest uppercase -mt-0.5">below</div>
            <div className="text-red-700 font-black text-xl tracking-tight uppercase -mt-0.5">RETAIL</div>
          </div>

          {/* Divider + Forgiato badge */}
          <div className="flex items-center gap-3 sm:border-l sm:border-gray-200 sm:pl-6">
            <div>
              <div className="text-gray-400 text-[10px] tracking-[0.3em] uppercase font-medium">Authorized Dealer</div>
              <div className="text-black font-black text-lg tracking-widest uppercase">FORGIATO</div>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
