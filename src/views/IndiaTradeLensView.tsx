import React from 'react';
import { 
  Globe2, 
  TrendingUp, 
  Anchor, 
  Ship, 
  ExternalLink 
} from 'lucide-react';
import { 
  INDIA_TRADE_MACRO, 
  INDIA_SECTORS, 
  INDIA_PORTS, 
  formatPercent 
} from '../data/maritimeData';

export const IndiaTradeLensView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>India Trade &amp; Maritime Corridors</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Sep 2026 Official
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ministry of Commerce statistics, Western Seaboard gateways, and Middle East feeder corridors.
          </p>
        </div>

        <a
          href={INDIA_TRADE_MACRO.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-2xs"
        >
          <span>MoCI Release</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 mb-1">Sep Merchandise Exports</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${INDIA_TRADE_MACRO.sepExportsBillion.toFixed(2)}B
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            +{INDIA_TRADE_MACRO.sepExportsYoY.toFixed(1)}% YoY
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 mb-1">Sep Merchandise Imports</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            ${INDIA_TRADE_MACRO.sepImportsBillion.toFixed(2)}B
          </div>
          <div className="text-xs text-slate-500 mt-1 font-semibold">
            +{INDIA_TRADE_MACRO.sepImportsYoY.toFixed(1)}% YoY
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 mb-1">Monthly Trade Deficit</div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            ${INDIA_TRADE_MACRO.sepTradeDeficitBillion.toFixed(2)}B
          </div>
          <div className="text-xs text-slate-500 mt-1">September 2026 balance</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 mb-1">H1 (Apr–Sep) Cumulative Deficit</div>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
            ${INDIA_TRADE_MACRO.h1TradeDeficitBillion.toFixed(2)}B
          </div>
          <div className="text-xs text-slate-500 mt-1">H1 Exports: $259.89B (+18.5%)</div>
        </div>
      </div>

      {/* Sector Breakdown Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Export Sectors &amp; Container Sensitivity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-[11px]">
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 font-mono">Sep Value</th>
                <th className="py-3 px-3 font-mono">YoY Growth %</th>
                <th className="py-3 px-3 font-mono">Share</th>
                <th className="py-3 px-3">Top Markets</th>
                <th className="py-3 px-3">Freight &amp; Route Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {INDIA_SECTORS.map((sector) => (
                <tr key={sector.category} className="hover:bg-slate-50 dark:hover:bg-[#182234] transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    {sector.category}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    ${sector.exportValueBillion.toFixed(2)}B
                  </td>
                  <td className="py-3 px-3 font-mono font-bold">
                    <span className={sector.growthYoY > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                      {formatPercent(sector.growthYoY)}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">
                    {sector.shareOfExports.toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {sector.topDestination}
                  </td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                    {sector.freightContext}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ports & Corridors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Anchor className="w-4 h-4 text-cyan-500" />
              <span>West Coast Ports Dwell</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
              Historical Snapshots
            </span>
          </div>

          <div className="space-y-2.5">
            {INDIA_PORTS.map((port) => (
              <div key={port.port} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{port.port}</span>
                  <span className="text-[10px] font-mono text-slate-400">{port.snapshotDate}</span>
                </div>
                <div className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                  Reported wait: {port.reportedWait}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{port.notes}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Ship className="w-4 h-4 text-blue-500" />
            <span>Middle East &amp; European Corridors</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60">
              <strong className="text-rose-600 dark:text-rose-400 block mb-1">Strait of Hormuz Feeder Risk:</strong>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Feeders connecting Mundra/JNPT to Jebel Ali face war-risk insurance spikes after last week's container ship sinking.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60">
              <strong className="text-amber-600 dark:text-amber-400 block mb-1">Cape Detour Transit Overhead:</strong>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                India to Northern Europe via Cape of Good Hope takes 32–36 days vs 18 days via Suez, tying up inventory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
