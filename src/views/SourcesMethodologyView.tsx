import React from 'react';
import { Database, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DATA_SOURCES } from '../data/maritimeData';

export const SourcesMethodologyView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Sources &amp; Methodology Catalog</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Audit Transparency
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified benchmark sources, publication frequencies, and coverage boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Sourced Snapshot: 24 Oct 2026</span>
        </div>
      </div>

      {/* 4 Qualification Rule Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="font-bold text-xs text-blue-600 dark:text-cyan-400">Signal Families</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Categorized strictly into Freight-Price, Capacity, Trade-Flow, or Operational Shocks.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400">Corroboration</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Requires ≥2 independent observations or 1 official statistical release (MoCI, Drewry).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="font-bold text-xs text-amber-600 dark:text-amber-400">Fact vs Hypothesis</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Physical export growth is verified fact; trader profitability is tagged as hypothesis.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="font-bold text-xs text-purple-600 dark:text-purple-400">Zero AIS Fabrication</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            No synthetic vessel GPS or fake carrier APIs are rendered.
          </p>
        </div>
      </div>

      {/* Sources Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Data Source Catalog
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-[11px]">
                <th className="py-3 px-3">Provider</th>
                <th className="py-3 px-3 font-mono">As Of</th>
                <th className="py-3 px-3">Coverage</th>
                <th className="py-3 px-3">Cadence</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {DATA_SOURCES.map((src) => (
                <tr key={src.name} className="hover:bg-slate-50 dark:hover:bg-[#182234] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{src.name}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                      {src.methodology}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                    {src.asOf}
                  </td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px] max-w-xs">
                    {src.coverage}
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {src.refreshCycle}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      src.status === 'Verified snapshot'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {src.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400 font-mono">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
