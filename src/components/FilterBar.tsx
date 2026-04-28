'use client';
import { Wheel } from '@/types';

interface Props {
  series: string[];
  activeSeries: string;
  onChange: (s: string) => void;
  wheels: Wheel[];
}

export default function FilterBar({ series, activeSeries, onChange, wheels }: Props) {
  const countFor = (s: string) =>
    s === 'All' ? wheels.length : wheels.filter(w => w.series === s).length;

  return (
    <div className="mb-8">
      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Browse by Collection</p>

      {/* Scrollable pill row */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {['All', ...series].map(s => {
          const active = activeSeries === s;
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                active
                  ? 'bg-red-700 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {s === 'All' ? `All (${countFor('All')})` : s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
