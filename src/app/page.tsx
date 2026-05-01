import WheelsGallery from '@/components/WheelsGallery';
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <SiteHeader />
      <div className="bg-zinc-900 border-b border-zinc-800 py-3 px-4 text-center">
        <p className="text-zinc-400 text-xs sm:text-sm">
          <span className="text-red-500 font-semibold">Authorized Forgiato Dealer Catalog</span>
          {' '}— Browse our full lineup and tap any wheel to request a personalized quote.
        </p>
      </div>
      <WheelsGallery />
    </main>
  );
}
