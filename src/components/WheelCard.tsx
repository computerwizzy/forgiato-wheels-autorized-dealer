'use client';
import Image from 'next/image';
import { Wheel } from '@/types';

interface Props { wheel: Wheel; onQuoteClick: (wheel: Wheel) => void; }

export default function WheelCard({ wheel, onQuoteClick }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="relative aspect-square">
        <Image
          src={wheel.imageUrl}
          alt={wheel.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {wheel.series}
        </span>
        <h3 className="text-white font-bold text-lg mt-1">{wheel.name}</h3>
        <button
          onClick={() => onQuoteClick(wheel)}
          className="mt-4 w-full bg-white text-black font-semibold py-2 px-4 rounded hover:bg-zinc-200 transition-colors"
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
}
