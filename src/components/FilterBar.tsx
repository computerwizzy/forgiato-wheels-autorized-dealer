'use client';
import { useRef } from 'react';
import { Wheel } from '@/types';

interface Props {
  series: string[];
  activeSeries: string;
  onChange: (s: string) => void;
  wheels: Wheel[];
}

export default function FilterBar({ series, activeSeries, onChange, wheels }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const countFor = (s: string) =>
    s === 'All' ? wheels.length : wheels.filter(w => w.series === s).length;

  const allSeries = ['All', ...series];

  return (
    <div className="mb-8">
      {/* Section label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">
          Filter by Series
        </span>
        {activeSeries !== 'All' && (
          <button
            onClick={() => onChange('All')}
            className="text-xs text-red-500 hover:text-red-400 transition-colors font-medium"
          >
            Clear filter ×
          </button>
        )}
      </div>

      {/* Scrollable pill row with fade edges */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allSeries.map(s => {
            const active = activeSeries === s;
            const count = countFor(s);
            return (
              <button
                key={s}
                onClick={() => onChange(s)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${
                  active
                    ? 'bg-red-700 border-red-700 text-white shadow-lg shadow-red-900/30'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-red-700 hover:text-white'
                }`}
              >
                <span>{s}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${
                  active ? 'bg-red-900 text-red-200' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active series indicator */}
      {activeSeries !== 'All' && (
        <div className="mt-3 px-1 text-sm text-zinc-400">
          Showing <span className="text-white font-semibold">{countFor(activeSeries)}</span> wheels in{' '}
          <span className="text-red-500 font-semibold">{activeSeries}</span>
        </div>
      )}
    </div>
  );
}
