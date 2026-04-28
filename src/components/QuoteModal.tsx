'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Wheel } from '@/types';

interface Props { wheel: Wheel; onClose: () => void; }

export default function QuoteModal({ wheel, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wheelName: wheel.name, name, email, phone, message }),
    });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-md p-6 relative" onClick={e => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl">✕</button>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image src={wheel.imageUrl} alt={wheel.name} fill className="object-contain" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs uppercase tracking-widest">{wheel.series}</p>
            <h2 className="text-white font-bold text-xl">{wheel.name}</h2>
          </div>
        </div>

        {submitted ? (
          <p className="text-green-400 text-center py-8 font-semibold">Request Sent! We&apos;ll contact you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={wheel.name} readOnly aria-label="Wheel" className="hidden" />
            <div>
              <label htmlFor="name" className="block text-zinc-300 text-sm mb-1">Your Name</label>
              <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white focus:outline-none focus:border-white" />
            </div>
            <div>
              <label htmlFor="email" className="block text-zinc-300 text-sm mb-1">Email</label>
              <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white focus:outline-none focus:border-white" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-zinc-300 text-sm mb-1">Phone</label>
              <input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white focus:outline-none focus:border-white" />
            </div>
            <div>
              <label htmlFor="message" className="block text-zinc-300 text-sm mb-1">Message (optional)</label>
              <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={3}
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white focus:outline-none focus:border-white resize-none" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-white text-black font-semibold py-2 px-4 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
