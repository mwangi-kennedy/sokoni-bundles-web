'use client';

import { useState, useMemo } from 'react';
import { BUNDLES } from '@/data/bundles';
import { Bundle } from '@/types';
import {
  Search,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  Package,
  PhoneCall,
  MessageSquare,
  Wifi,
  Sparkles,
  X,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Headphones,
  Zap
} from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBundle, setActiveBundle] = useState<Bundle | null>(null);
  const [copiedTill, setCopiedTill] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState('');

  const tillNumber = '4129381';

  const categories = [
    { id: 'All', label: 'All Offers', icon: Package, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { id: 'Bulk', label: 'Bulk Bundles', icon: Package, color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    { id: 'Minutes', label: 'Minutes', icon: Clock, color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { id: 'Airtime', label: 'Calls & Airtime', icon: PhoneCall, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'SMS', label: 'SMS', icon: MessageSquare, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'Airtel', label: 'Airtel Bundles', icon: Wifi, color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { id: 'Special', label: 'Special Offer', icon: Sparkles, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  ];

  const copyTill = () => {
    navigator.clipboard.writeText(tillNumber);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  const filteredBundles = useMemo(() => {
    return BUNDLES.filter((b) => {
      const catLower = b.category.toLowerCase();
      const selLower = selectedCategory.toLowerCase();

      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Airtel' && b.provider === 'Airtel') ||
        (selectedCategory === 'Special' && b.popular) ||
        catLower.includes(selLower) ||
        (selectedCategory === 'Bulk' && (catLower.includes('bulk') || parseInt(b.dataAmount) >= 10)) ||
        (selectedCategory === 'Airtime' && catLower.includes('airtime'));

      const matchesSearch =
        b.dataAmount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.provider.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans flex flex-col justify-between">
      {/* Background Glow Highlights */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div>
        {/* Sticky Header Bar */}
        <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
                K
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-white">
                  Kib Data Hub
                </h1>
                <p className="text-[10px] font-medium text-emerald-400 uppercase tracking-widest">
                  Instant Bundles & Airtime
                </p>
              </div>
            </div>

            <button
              onClick={copyTill}
              className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50"
            >
              <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
              <span>Till: <strong className="text-white font-mono">{tillNumber}</strong></span>
              {copiedTill ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 opacity-60" />
              )}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Cheapest Safaricom & Airtel Deals in Kenya</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Get Instant Data, Mins & Airtime
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Fast processing. Works even with active <strong className="text-emerald-400">Okoa Jahazi</strong> debt.
          </p>
        </section>

        {/* Category Navigation Bar */}
        <section className="mx-auto max-w-6xl px-4 my-6">
          <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none justify-start sm:justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 min-w-[85px] p-3 rounded-2xl border backdrop-blur-md transition-all duration-200 ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/10 scale-105'
                      : 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 whitespace-nowrap">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search & Bundles Display */}
        <section className="mx-auto max-w-6xl px-4 mt-4 mb-16">
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search e.g. 10GB, Minutes, Airtime, Safaricom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBundles.map((bundle) => {
              const isSafaricom = bundle.provider === 'Safaricom';
              return (
                <div
                  key={bundle.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-emerald-900/10"
                >
                  {bundle.popular && (
                    <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md">
                      Popular
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                          isSafaricom
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {bundle.provider}
                      </span>
                      {bundle.okoaFriendly && (
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                          <ShieldCheck className="h-4 w-4 text-emerald-400" /> Okoa OK
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                        {bundle.dataAmount}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {bundle.title}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>Validity: {bundle.validity}</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-slate-500 font-medium">Price</span>
                      <span className="text-2xl font-black text-white">
                        KSh {bundle.price}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveBundle(bundle)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-bold text-slate-950 transition-all duration-200 hover:brightness-110 shadow-lg shadow-emerald-500/20"
                    >
                      <span>Buy Package</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Modal Popup for Payment */}
      {activeBundle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setActiveBundle(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Buy {activeBundle.dataAmount} ({activeBundle.provider})
                </h3>
                <p className="text-xs text-slate-400">
                  Payment to Kib Data Hub Till
                </p>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Recipient Phone Number (Where bundle will be sent)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  placeholder="e.g. 0712345678"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Buy Goods Till Number:</span>
                <button
                  onClick={copyTill}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 font-mono font-bold text-emerald-400 hover:bg-emerald-500/20"
                >
                  <span>{tillNumber}</span>
                  {copiedTill ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount to Pay:</span>
                <span className="font-bold text-white">KSh {activeBundle.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Store Name:</span>
                <span className="font-bold text-emerald-400">Kib Data Hub</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setActiveBundle(null)}
                className="flex-1 rounded-xl border border-slate-800 py-3 text-xs font-bold text-slate-400 hover:bg-slate-800"
              >
                Close
              </button>
              <a
                href={`https://wa.me/?text=Hello%20Kib%20Data%20Hub,%20I%20have%20sent%20KSh%20${activeBundle.price}%20to%20Till%20${tillNumber}%20for%20${encodeURIComponent(activeBundle.provider)}%20${encodeURIComponent(activeBundle.dataAmount)}.%20Recipient%20Phone:%20${encodeURIComponent(recipientPhone || 'Unspecified')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="h-4 w-4" /> Confirm on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer & Contact Information */}
      <footer className="border-t border-slate-800/80 bg-slate-950 pt-12 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Business Info */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-black text-slate-950 text-base">
                  K
                </div>
                <span className="text-lg font-bold text-white">Kib Data Hub</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Kenya’s trusted platform for discounted Safaricom and Airtel data packages, voice minutes, SMS, and airtime. Instant automated dispatch.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span>Buy Goods Till: <strong className="text-white">{tillNumber}</strong></span>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Why Kib Data Hub?
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> 100% Okoa Jahazi Compatible
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-400" /> Instant Processing Under 1 Minute
                </li>
                <li className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-purple-400" /> Dedicated Customer Support
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Customer Support & Enquiries
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+254 790 036 399 / WhatsApp Helpline</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>kibdatahub@hey.com</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>Nairobi, Kenya • Operating 24/7</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-900 pt-6 text-center text-[11px] text-slate-500">
            © {new Date().getFullYear()} Kib Data Hub. All rights reserved. Safaricom and Airtel logos/trademarks belong to their respective owners.
          </div>
        </div>
      </footer>
    </main>
  );
}