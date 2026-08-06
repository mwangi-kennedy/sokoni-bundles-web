'use client';

import React from 'react';
import { Bundle } from '@/types';
import { Zap, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface BundleCardProps {
  bundle: Bundle;
  onSelect: (bundle: Bundle) => void;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle, onSelect }) => {
  const isSafaricom = bundle.provider === 'Safaricom';

  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      {bundle.popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Best Value
        </span>
      )}

      <div>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
              isSafaricom
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {bundle.provider}
          </span>
          {bundle.okoaFriendly && (
            <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Okoa OK
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-extrabold text-slate-900">
            {bundle.dataAmount}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {bundle.title}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-600">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>Valid for {bundle.validity}</span>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs text-slate-400 font-medium">Price</span>
          <span className="text-xl font-bold text-slate-900">
            KSh {bundle.price}
          </span>
        </div>

        <button
          onClick={() => onSelect(bundle)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <span>Order Info</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};