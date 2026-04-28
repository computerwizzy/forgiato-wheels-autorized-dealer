'use client';
import Image from 'next/image';
import { Wheel } from '@/types';

interface Props {
  wheel: Wheel;
  onDetailClick: (wheel: Wheel) => void;
}

export default function WheelCard({ wheel, onDetailClick }: Props) {
  return (
    <div
      onClick={() => onDetailClick(wheel)}
      className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden hover:scale-[1.02] hover:border-zinc-500 transition-all duration-200 cursor-pointer"
    >
      <div className="relative aspect-square">
        <Image
          src={wheel.imageUrl}
          alt={wheel.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {wheel.series}
        </span>
        <h3 className="text-white font-bold text-lg mt-1">{wheel.name}</h3>
        <div className="mt-4 w-full bg-white text-black font-semibold py-2 px-4 rounded text-center text-sm">
          View Details
        </div>
      </div>
    </div>
  );
}
