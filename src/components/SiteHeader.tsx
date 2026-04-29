import Image from 'next/image';

export default function SiteHeader() {
  return (
    <>
      {/* Red top bar */}
      <div className="bg-red-700 text-white py-2 px-4 text-center">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">For Custom Quote and Availability Call </span>
        <a
          href="tel:2056441082"
          className="text-xs sm:text-sm font-bold tracking-widest uppercase underline hover:text-red-200 transition-colors"
        >
          205-644-1082
        </a>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

          {/* Logo */}
          <Image
            src="https://www.wheelsbelowretail.com/cdn/shop/files/logo_ab2d699e-4150-4a03-8027-2c7d6dc1f653.png?v=1650604568&width=150"
            alt="Wheels Below Retail"
            width={120}
            height={48}
            className="object-contain"
            priority
          />

          {/* Build time - center (desktop only) */}
          <div className="hidden sm:block border-2 border-red-600 bg-red-50 rounded-lg px-6 py-3 text-center shadow-sm shadow-red-200">
            <p className="text-gray-700 text-sm sm:text-base font-semibold">• Custom Finishes</p>
            <p className="text-gray-700 text-sm sm:text-base font-semibold">• 4 to 6 Weeks Build Time</p>
          </div>

          {/* Forgiato badge */}
          <div className="border-l border-gray-200 pl-4 sm:pl-6">
            <div className="text-gray-400 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium">Authorized Dealer</div>
            <div className="text-black font-black text-base sm:text-lg tracking-widest uppercase">FORGIATO</div>
          </div>

        </div>

        {/* Build time - mobile only, full width below logo row */}
        <div className="sm:hidden px-4 pb-3">
          <div className="border-2 border-red-600 bg-red-50 rounded-lg py-2 text-center">
            <p className="text-gray-700 text-sm font-semibold">• Custom Finishes &nbsp;•&nbsp; 4 to 6 Weeks Build Time</p>
          </div>
        </div>

      </header>


    </>
  );
}
