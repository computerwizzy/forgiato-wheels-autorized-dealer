import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function SiteHeader() {
  return (
    <>
      {/* Thin announcement strip */}
      <div className="bg-black border-b border-zinc-900 py-2 px-4 text-center">
        <a
          href="tel:2056441082"
          className="text-zinc-500 text-xs tracking-[0.35em] uppercase hover:text-amber-400 transition-colors duration-300"
        >
          ✦&nbsp;&nbsp;Call 205-644-1082&nbsp;&nbsp;✦
        </a>
      </div>

      {/* Luxury header */}
      <header className="relative bg-black overflow-hidden">
        {/* Top gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />

        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,101,0.04)_0%,_transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-3 text-center">

          {/* Brand name */}
          <h1 className={`${playfair.className} text-white text-3xl md:text-4xl font-semibold tracking-wide leading-tight`}>
            Wheels Below Retail
          </h1>

          {/* Gold divider with subtitle */}
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-700/50" />
            <span className="text-amber-500/90 text-[10px] tracking-[0.45em] uppercase font-light whitespace-nowrap">
              Forgiato Authorized Dealer
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-700/50" />
          </div>

        </div>

        {/* Bottom gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
      </header>
    </>
  );
}
