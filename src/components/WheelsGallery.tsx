'use client';
import { useState, useEffect } from 'react';
import { Wheel } from '@/types';
import WheelCard from './WheelCard';
import FilterBar from './FilterBar';
import WheelDetailModal from './WheelDetailModal';

export default function WheelsGallery() {
  const [wheels, setWheels] = useState<Wheel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSeries, setActiveSeries] = useState('All');
  const [selectedWheel, setSelectedWheel] = useState<Wheel | null>(null);

  useEffect(() => {
    fetch('/api/wheels')
      .then(r => r.json())
      .then(data => { setWheels(data.wheels ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allSeries = [...new Set(wheels.map(w => w.series))].sort();
  const filtered = activeSeries === 'All' ? wheels : wheels.filter(w => w.series === activeSeries);

  if (loading) {
    return <div className="flex items-center justify-center py-24 text-zinc-400 text-lg">Loading wheels...</div>;
  }

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <FilterBar series={allSeries} activeSeries={activeSeries} onChange={setActiveSeries} wheels={wheels} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(wheel => (
          <WheelCard key={wheel.slug} wheel={wheel} onDetailClick={setSelectedWheel} />
        ))}
      </div>
      {selectedWheel && (
        <WheelDetailModal
          key={selectedWheel.slug}
          wheel={selectedWheel}
          onClose={() => setSelectedWheel(null)}
        />
      )}
    </section>
  );
}
