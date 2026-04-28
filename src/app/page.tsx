import WheelsGallery from '@/components/WheelsGallery';
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <SiteHeader />
      <WheelsGallery />
    </main>
  );
}
