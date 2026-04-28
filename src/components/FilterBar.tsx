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

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const label = activeSeries === 'All' ? 'All Collections' : activeSeries;

  return (
    <div className="mb-10">
      <div ref={ref} className="relative">

        {/* ── Trigger button ── */}
        <button
          onClick={() => setOpen(o => !o)}
          className="group flex items-center justify-between w-full sm:w-72 bg-transparent border border-zinc-700 hover:border-red-700/70 rounded-lg px-5 py-3.5 text-left transition-all duration-200 focus:outline-none"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zM6 10h12M9 16h6" />
            </svg>
            <div>
              <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase block">Collection</span>
              <span className="text-white font-semibold text-sm">{label}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
              {countFor(activeSeries)}
            </span>
            <svg
              className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* ── Dropdown panel ── */}
        {open && (
          <div className="absolute top-full left-0 mt-2 w-full sm:w-[540px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/80 z-30 overflow-hidden">

            {/* Header */}
            <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-500 text-[10px] tracking-[0.35em] uppercase">Select Collection</span>
              <span className="text-zinc-600 text-xs">{series.length + 1} collections</span>
            </div>

            {/* All option */}
            <button
              onClick={() => { onChange('All'); setOpen(false); }}
              className={`w-full flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/50 transition-colors duration-150 ${
                activeSeries === 'All'
                  ? 'bg-red-700/10 text-red-400'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {activeSeries === 'All' && (
                  <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-semibold text-sm">All Collections</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                activeSeries === 'All' ? 'bg-red-900/40 text-red-400' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {countFor('All')}
              </span>
            </button>

            {/* Series grid */}
            <div className="grid grid-cols-2 max-h-64 overflow-y-auto">
              {series.map((s, i) => {
                const active = activeSeries === s;
                const count = countFor(s);
                return (
                  <button
                    key={s}
                    onClick={() => { onChange(s); setOpen(false); }}
                    className={`flex items-center justify-between px-5 py-3 text-sm transition-colors duration-150 border-b border-zinc-800/40 ${
                      i % 2 === 0 ? 'border-r border-zinc-800/40' : ''
                    } ${
                      active
                        ? 'bg-red-700/10 text-red-400'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {active && (
                        <svg className="w-3 h-3 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="truncate font-medium">{s}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ml-2 ${
                      active ? 'bg-red-900/40 text-red-400' : 'bg-zinc-800/80 text-zinc-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            {activeSeries !== 'All' && (
              <div className="px-5 py-3 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => { onChange('All'); setOpen(false); }}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Clear filter ×
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active filter tag */}
      {activeSeries !== 'All' && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-zinc-600 text-xs uppercase tracking-widest">Showing</span>
          <span className="flex items-center gap-2 bg-red-700/10 border border-red-700/30 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            {activeSeries} · {countFor(activeSeries)} wheels
            <button onClick={() => onChange('All')} className="hover:text-white transition-colors ml-1">×</button>
          </span>
        </div>
      )}
    </div>
  );
}
