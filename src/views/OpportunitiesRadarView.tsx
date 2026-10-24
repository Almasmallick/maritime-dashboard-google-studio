import React, { useState } from 'react';
import { 
  TrendingUp, 
  ExternalLink, 
  ShieldCheck, 
  Filter, 
  ArrowUpDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { OPPORTUNITIES_DATA, formatPercent } from '../data/maritimeData';
import { OpportunitySignal } from '../types';
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart';

interface OpportunitiesRadarViewProps {
  searchQuery: string;
  onOpenDossier: (opp: OpportunitySignal) => void;
}

type SortField = 'name' | 'type' | 'growthPct' | 'evidenceCount' | 'confidence';

export const OpportunitiesRadarView: React.FC<OpportunitiesRadarViewProps> = ({
  searchQuery,
  onOpenDossier
}) => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('growthPct');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filtered = OPPORTUNITIES_DATA.filter(opp => {
    const matchesType = selectedType === 'ALL' || opp.type === selectedType;
    const matchesSearch = !searchQuery ||
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.whoCouldBenefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
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

  const barChartRows = OPPORTUNITIES_DATA
    .filter(o => o.growthPct !== null)
    .map(o => ({
      id: o.id,
      label: o.name.length > 28 ? o.name.slice(0, 26) + '…' : o.name,
      value: o.growthPct as number
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Opportunities Radar</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {OPPORTUNITIES_DATA.length} Verified
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ranked trade flow expansions, contractual timing windows, and transshipment hubs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 text-xs">
          {['ALL', 'Trade flow', 'Freight', 'Port connectivity'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedType === type
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-cyan-400 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {type === 'ALL' ? 'All Signals' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Bar Distribution Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Growth &amp; Shift Magnitude Distribution
          </h2>
          <span className="text-xs font-mono text-slate-400">Official Baseline % Move</span>
        </div>
        <HorizontalBarChart rows={barChartRows} />
      </div>

      {/* Opportunities Registry Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Ranked Signal Registry
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
                    <span>Signal / Opportunity</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('type')} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Family
                </th>
                <th className="py-3 px-3">Scope</th>
                <th onClick={() => handleSort('growthPct')} className="py-3 px-3 font-mono cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Metric
                </th>
                <th onClick={() => handleSort('evidenceCount')} className="py-3 px-3 font-mono cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Evidence
                </th>
                <th onClick={() => handleSort('confidence')} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                  Confidence
                </th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {sorted.map((opp) => {
                const confBadge = 
                  opp.confidence === 'High' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  opp.confidence === 'Medium' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                  'bg-amber-500/10 text-amber-600 dark:text-amber-400';

                return (
                  <tr
                    key={opp.id}
                    onClick={() => onOpenDossier(opp)}
                    className="hover:bg-slate-50 dark:hover:bg-[#182234] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                      <div>{opp.name}</div>
                      <div className="text-[11px] font-normal text-slate-400 dark:text-slate-400 truncate mt-0.5">
                        {opp.whoCouldBenefit}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                        {opp.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {opp.scope}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">{opp.metric}</div>
                      {opp.growthPct !== null && (
                        <div className={opp.growthPct > 0 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-amber-600 dark:text-amber-400 font-semibold"}>
                          {formatPercent(opp.growthPct)}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                        <ShieldCheck className="w-3 h-3 text-cyan-500" />
                        {opp.evidenceCount} sources
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${confBadge}`}>
                        {opp.confidence}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
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
