import WheelsGallery from '@/components/WheelsGallery';
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <SiteHeader />
      <div className="border-b border-zinc-800 px-6 py-5">
        <p className="text-zinc-400 text-sm max-w-7xl mx-auto">
          Browse the full Forgiato collection and request a quote on any wheel.
        </p>
      </div>
      <WheelsGallery />
    </main>
  );
}
