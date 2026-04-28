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
    <div className="mb-10">
      <p className="text-zinc-400 text-sm font-semibold mb-4">
        {activeSeries === 'All'
          ? `All Collections — ${wheels.length} wheels`
          : `${activeSeries} — ${countFor(activeSeries)} wheels`}
      </p>

      <div className="flex flex-wrap gap-3">
        {['All', ...series].map(s => {
          const active = activeSeries === s;
          const count = countFor(s);
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-150 border-2 ${
                active
                  ? 'bg-red-700 border-red-700 text-white shadow-lg shadow-red-900/40 scale-105'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-red-700 hover:text-white'
              }`}
            >
              <span>{s === 'All' ? 'All Wheels' : s}</span>
              <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                active ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
