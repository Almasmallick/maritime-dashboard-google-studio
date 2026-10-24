import React, { useState } from 'react';
import { 
  TrendingDown, 
  AlertTriangle, 
  ArrowUpDown, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { HARDEST_FALLS_DATA, formatPercent } from '../data/maritimeData';
import { HardestFallSignal } from '../types';
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart';

interface HardestFallsViewProps {
  searchQuery: string;
  onOpenDossier: (fall: HardestFallSignal) => void;
}

type SortField = 'name' | 'changePct' | 'classification' | 'kind';

export const HardestFallsView: React.FC<HardestFallsViewProps> = ({
  searchQuery,
  onOpenDossier
}) => {
  const [selectedKind, setSelectedKind] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('changePct');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filtered = HARDEST_FALLS_DATA.filter(fall => {
    const matchesKind = selectedKind === 'ALL' || fall.kind === selectedKind;
    const matchesSearch = !searchQuery ||
      fall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fall.plausibleDriver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fall.exposedStakeholders.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKind && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    if (typeof aVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const barChartRows = HARDEST_FALLS_DATA
    .filter(f => f.changePct !== null)
    .map(f => ({
      id: f.id,
      label: f.name.length > 28 ? f.name.slice(0, 26) + '…' : f.name,
      value: f.changePct as number
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Hardest Falls &amp; Deteriorations</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {HARDEST_FALLS_DATA.length} Signals
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Deterioration analysis separating spot price declines from physical volume contractions.
          </p>
        </div>

        {/* Kind Filters */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 text-xs">
          {['ALL', 'price', 'demand', 'ops'].map((k) => (
            <button
              key={k}
              onClick={() => setSelectedKind(k)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedKind === k
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-cyan-400 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {k === 'ALL' ? 'All (6)' : k === 'price' ? 'Price Falls' : k === 'demand' ? 'Demand Vol' : 'Security / Ops'}
            </button>
          ))}
        </div>
      </div>

      {/* Sleek Alert Pill */}
      <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
        <Info className="w-4 h-4 shrink-0 text-amber-500" />
        <span><strong>Analytical Rule:</strong> Freight price drops reflect carrier vessel supply injections and Cape routing adjustments, not falling consumer demand.</span>
      </div>

      {/* Magnitude Horizontal Chart Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Recorded Negative Shifts (% Baseline Contraction)
          </h2>
          <span className="text-xs font-mono text-slate-400">Sorted by Decline Magnitude</span>
        </div>
        <HorizontalBarChart rows={barChartRows} />
      </div>

      {/* Deterioration Signals Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Deterioration Registry
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Showing {sorted.length} signals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-[11px]">
                <th onClick={() => handleSort('name')} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Signal / Market Item</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('changePct')} className="py-3 px-3 font-mono cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Magnitude
                </th>
                <th onClick={() => handleSort('kind')} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Kind
                </th>
                <th onClick={() => handleSort('classification')} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Classification
                </th>
                <th className="py-3 px-3">Plausible Driver</th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {sorted.map((fall) => {
                const classBadge = 
                  fall.classification === 'Sharp deterioration' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold' :
                  fall.classification === 'Persistent decline' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                  fall.classification === 'Emerging warning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';

                return (
                  <tr
                    key={fall.id}
                    onClick={() => onOpenDossier(fall)}
                    className="hover:bg-slate-50 dark:hover:bg-[#182234] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                      <div>{fall.name}</div>
                      <div className="text-[11px] font-normal text-slate-400 dark:text-slate-400 truncate mt-0.5">
                        {fall.source} ({fall.observationDate})
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {fall.changePct !== null ? formatPercent(fall.changePct) : "Qualitative"}
                      </div>
                      <div className="text-[10px] text-slate-400">{fall.basis}</div>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-[10.5px]">
                        {fall.kind}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${classBadge}`}>
                        {fall.classification}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 text-[11px] max-w-xs truncate">
                      {fall.plausibleDriver}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
