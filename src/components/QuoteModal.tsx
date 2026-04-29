'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Wheel } from '@/types';

interface Props { wheel: Wheel; onClose: () => void; }

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));

function parseSizes(sizesStr: string): string[] {
  return sizesStr.match(/\d+["″]/g) ?? sizesStr.split(/[\s,]+/).filter(Boolean);
}

function isValidPhone(phone: string) {
  return /^\+?[\d\s\-().]{10,}$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function isValidName(name: string) {
  return name.trim().length >= 3 && /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]+$/.test(name.trim());
}

const inputCls = 'w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors';
const inputErrCls = 'w-full bg-zinc-800 border border-red-500 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-400 transition-colors';
const labelCls = 'block text-zinc-300 text-sm mb-1';

export default function QuoteModal({ wheel, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    sizePreference: '',
    finishPreference: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  function validate() {
    const errs: Record<string, string> = {};
    if (!isValidName(form.name)) errs.name = 'Enter a valid full name (letters only)';
    if (!isValidPhone(form.phone)) errs.phone = 'Enter a valid 10-digit phone number';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot — silently drop bot submissions
    if (form.honeypot) { setSubmitted(true); return; }
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const { honeypot: _, ...payload } = form;
    await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wheelName: wheel.name, wheelImageUrl: wheel.imageUrl, ...payload }),
    });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl transition-colors"
          >
            ✕
          </button>

          {/* Wheel header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden">
              <Image src={wheel.imageUrl} alt={wheel.name} fill className="object-contain p-1" />
            </div>
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{wheel.series}</p>
              <h2 className="text-white font-bold text-xl uppercase">{wheel.name}</h2>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-10">
              <p className="text-green-400 font-semibold text-lg mb-2">Request Sent!</p>
              <p className="text-zinc-400 text-sm">We&apos;ll reach out to you shortly to discuss your order.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Honeypot — hidden from humans, bots fill it */}
              <input
                type="text"
                value={form.honeypot}
                onChange={set('honeypot')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* ── Contact ── */}
              <fieldset>
                <legend className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Your Information</legend>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="q-name" className={labelCls}>Full Name <span className="text-zinc-500">*</span></label>
                    <input id="q-name" type="text" required value={form.name} onChange={set('name')} className={errors.name ? inputErrCls : inputCls} placeholder="John Smith" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="q-email" className={labelCls}>Email <span className="text-zinc-500">*</span></label>
                      <input id="q-email" type="email" required value={form.email} onChange={set('email')} className={inputCls} placeholder="john@example.com" />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className={labelCls}>Phone <span className="text-zinc-500">*</span></label>
                      <input id="q-phone" type="tel" required value={form.phone} onChange={set('phone')} className={errors.phone ? inputErrCls : inputCls} placeholder="(555) 000-0000" />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* ── Vehicle ── */}
              <fieldset>
                <legend className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Your Vehicle</legend>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="q-year" className={labelCls}>Year <span className="text-zinc-500">*</span></label>
                      <select id="q-year" required value={form.vehicleYear} onChange={set('vehicleYear')} className={inputCls}>
                        <option value="">Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-make" className={labelCls}>Make <span className="text-zinc-500">*</span></label>
                      <input id="q-make" type="text" required value={form.vehicleMake} onChange={set('vehicleMake')} className={inputCls} placeholder="BMW" />
                    </div>
                    <div>
                      <label htmlFor="q-model" className={labelCls}>Model <span className="text-zinc-500">*</span></label>
                      <input id="q-model" type="text" required value={form.vehicleModel} onChange={set('vehicleModel')} className={inputCls} placeholder="M5" />
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* ── Wheel Preferences ── */}
              <fieldset>
                <legend className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Wheel Preferences</legend>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="q-size" className={labelCls}>Size</label>
                      {wheel.detail?.specs.sizes ? (
                        <select id="q-size" value={form.sizePreference} onChange={set('sizePreference')} className={inputCls}>
                          <option value="">Select size</option>
                          {parseSizes(wheel.detail.specs.sizes).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <input id="q-size" type="text" value={form.sizePreference} onChange={set('sizePreference')} className={inputCls} placeholder='e.g. 22" or 24"' />
                      )}
                    </div>
                    <div>
                      <label htmlFor="q-finish" className={labelCls}>Finish / Color</label>
                      <input id="q-finish" type="text" value={form.finishPreference} onChange={set('finishPreference')} className={inputCls} placeholder="e.g. Brushed Silver" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="q-message" className={labelCls}>Additional Notes</label>
                    <textarea
                      id="q-message"
                      value={form.message}
                      onChange={set('message')}
                      rows={3}
                      className={`${inputCls} resize-none`}
                      placeholder="Any other details, questions, or special requests..."
                    />
                  </div>
                </div>
              </fieldset>

              <p className="text-zinc-500 text-xs leading-relaxed">
                By providing your phone number you consent to receive texts from us regarding your inquiry. Msg &amp; data rates may apply.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 text-base"
              >
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
