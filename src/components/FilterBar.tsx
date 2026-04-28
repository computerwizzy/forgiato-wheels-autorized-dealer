'use client';

interface Props { series: string[]; activeSeries: string; onChange: (s: string) => void; }

export default function FilterBar({ series, activeSeries, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {['All', ...series].map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeSeries === s
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-zinc-300 border-zinc-600 hover:border-zinc-400'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
