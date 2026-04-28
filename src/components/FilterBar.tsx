'use client';
import { useState, useRef, useEffect } from 'react';
import { Wheel } from '@/types';

interface Props {
  series: string[];
  activeSeries: string;
  onChange: (s: string) => void;
  wheels: Wheel[];
}

export default function FilterBar({ series, activeSeries, onChange, wheels }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const countFor = (s: string) =>
    s === 'All' ? wheels.length : wheels.filter(w => w.series === s).length;

  const allSeries = ['All', ...series];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const activeCount = countFor(activeSeries);

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Dropdown */}
      <div ref={ref} className="relative w-full sm:w-72">
        {/* Trigger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-700 hover:border-amber-700/60 rounded-lg px-4 py-3 text-left transition-colors duration-200 group"
        >
          <div>
            <span className="block text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-0.5">
              Filter by Series
            </span>
            <span className="text-white font-semibold text-sm">
              {activeSeries === 'All' ? 'All Collections' : activeSeries}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="bg-zinc-800 text-zinc-400 text-xs font-bold px-2 py-0.5 rounded">
              {activeCount}
            </span>
            <svg
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl shadow-black/60 z-30 overflow-hidden">
            <div className="max-h-72 overflow-y-auto">
              {allSeries.map(s => {
                const active = activeSeries === s;
                const count = countFor(s);
                return (
                  <button
                    key={s}
                    onClick={() => { onChange(s); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 ${
                      active
                        ? 'bg-amber-700/20 text-amber-400 font-semibold'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <span>{s === 'All' ? 'All Collections' : s}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      active ? 'bg-amber-900/50 text-amber-400' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Active filter indicator */}
      {activeSeries !== 'All' && (
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 text-sm">
            Showing <span className="text-white font-semibold">{activeCount}</span> wheels in{' '}
            <span className="text-amber-500 font-semibold">{activeSeries}</span>
          </span>
          <button
            onClick={() => onChange('All')}
            className="text-xs text-zinc-500 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded px-2 py-1 transition-colors"
          >
            Clear ×
          </button>
        </div>
      )}
    </div>
  );
}
