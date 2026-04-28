export default function SiteHeader() {
  return (
    <>
      {/* Red top bar */}
      <div className="bg-red-700 text-white py-2 px-4 text-center">
        <a
          href="tel:2056441082"
          className="text-xs sm:text-sm font-bold tracking-widest uppercase hover:text-red-200 transition-colors"
        >
          CALL 205-644-1082
        </a>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="leading-tight">
            <div className="text-black font-black text-base sm:text-xl tracking-tight uppercase">WHEELS</div>
            <div className="text-black font-normal text-[10px] sm:text-xs tracking-widest uppercase -mt-0.5">below</div>
            <div className="text-red-700 font-black text-base sm:text-xl tracking-tight uppercase -mt-0.5">RETAIL</div>
          </div>

          {/* Forgiato badge */}
          <div className="border-l border-gray-200 pl-4 sm:pl-6">
            <div className="text-gray-400 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium">Authorized Dealer</div>
            <div className="text-black font-black text-base sm:text-lg tracking-widest uppercase">FORGIATO</div>
          </div>

        </div>
      </header>
    </>
  );
}
