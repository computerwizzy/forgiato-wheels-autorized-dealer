import WheelsGallery from '@/components/WheelsGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Forgiato Wheels — Authorized Dealer
        </h1>
        <p className="text-zinc-400 mt-1 text-sm">
          Browse the full collection and request a quote on any wheel.
        </p>
      </header>
      <WheelsGallery />
    </main>
  );
}
