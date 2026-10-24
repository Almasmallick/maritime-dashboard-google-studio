import React, { useState } from 'react';
import { 
  Ship, 
  ExternalLink, 
  AlertTriangle, 
  Calendar, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  Anchor,
  Info
} from 'lucide-react';
import { 
  LANES_DATA, 
  FBX_INDEX_DATA, 
  BASELINE_DATES, 
  calculatePercentageChange,
  formatCurrency, 
  formatPercent 
} from '../data/maritimeData';
import { SmoothAreaChart, AreaSeries } from '../components/charts/SmoothAreaChart';
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart';

interface FreightCapacityViewProps {
  selectedLane: string;
  baselineIndex: number;
  searchQuery: string;
  onSelectLane: (laneId: string) => void;
  onSelectBaseline: (idx: number) => void;
}

export const FreightCapacityView: React.FC<FreightCapacityViewProps> = ({
  selectedLane,
  baselineIndex,
  searchQuery,
  onSelectLane,
  onSelectBaseline
}) => {
  const [activeTab, setActiveTab] = useState<'wci' | 'fbx' | 'capacity'>('wci');

  const filteredLanes = LANES_DATA.filter(l => {
    const matchesLane = selectedLane === 'ALL' || l.id === selectedLane;
    const matchesSearch = !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLane && matchesSearch;
  });

  const laneChangeRows = filteredLanes
    .map(l => {
      const baseVal = l.rates[baselineIndex];
      const latestVal = l.rates[2];
      const chg = calculatePercentageChange(latestVal, baseVal);
      return {
        id: l.id,
        label: l.id,
        value: chg
      };
    })
    .filter((r): r is { id: string; label: string; value: number } => r.value !== null);

  const colors = [
    { color: '#0ea5e9', id: 'fc-1' },
    { color: '#8b5cf6', id: 'fc-2' },
    { color: '#10b981', id: 'fc-3' },
    { color: '#f59e0b', id: 'fc-4' },
    { color: '#ec4899', id: 'fc-5' }
  ];

  const lineSeries: AreaSeries[] = filteredLanes
    .filter(l => l.rates[2] !== null)
    .slice(0, 5)
    .map((l, i) => ({
      id: l.id,
      name: l.name,
      color: colors[i % colors.length].color,
      gradientId: colors[i % colors.length].id,
      values: l.rates
    }));

  const baseLabel = BASELINE_DATES[baselineIndex].shortLabel;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Freight Indices &amp; Capacity</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              USD / FEU
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Lane-level rate movements, blank sailings, and separate index benchmarks.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 text-xs">
          <button
            onClick={() => setActiveTab('wci')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'wci'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-cyan-400 shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Drewry WCI (8 Lanes)
          </button>
          <button
            onClick={() => setActiveTab('fbx')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'fbx'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-cyan-400 shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Freightos FBX
          </button>
          <button
            onClick={() => setActiveTab('capacity')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'capacity'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-cyan-400 shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Blank Sailings &amp; Suez
          </button>
        </div>
      </div>

      {/* Capacity Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-amber-600 dark:text-amber-400">Asia–Europe Blankings</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">Week 43</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            8 Blank Sailings
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Up from 2 blankings prior week (carrier GRI defense).
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Transpacific Reliability</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">Stable</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            2 Blank Sailings
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Decreased from 6 blankings in prior fortnight.
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Suez Canal Cadence</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Week 42</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            55 Sailings / Week
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Holding steady (54 sailings in wk 41).
          </div>
        </div>
      </div>

      {activeTab === 'wci' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Drewry WCI Lane Spot Trajectories (USD/FEU)
              </h2>
              <SmoothAreaChart dates={["20 Aug", "8 Oct", "22 Oct"]} series={lineSeries} height={230} />
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Shift vs {baseLabel}
              </h2>
              <p className="text-xs text-slate-400 mb-2">Percentage change</p>
              <HorizontalBarChart rows={laneChangeRows} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Drewry WCI Granular Lane Assessment
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-[11px]">
                    <th className="py-3 px-3">Lane ID</th>
                    <th className="py-3 px-3">Corridor</th>
                    <th className="py-3 px-3 font-mono">20 Aug</th>
                    <th className="py-3 px-3 font-mono">8 Oct</th>
                    <th className="py-3 px-3 font-mono text-slate-900 dark:text-white">22 Oct (Latest)</th>
                    <th className="py-3 px-3 font-mono">Δ vs {baseLabel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredLanes.map((lane) => {
                    const baseVal = lane.rates[baselineIndex];
                    const latestVal = lane.rates[2];
                    const chg = calculatePercentageChange(latestVal, baseVal);

                    return (
                      <tr key={lane.id} className="hover:bg-slate-50 dark:hover:bg-[#182234] transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-blue-600 dark:text-cyan-400">
                          {lane.id}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                          {lane.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400">
                          {formatCurrency(lane.rates[0])}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400">
                          {formatCurrency(lane.rates[1])}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                          {formatCurrency(latestVal)}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold">
                          {chg !== null ? (
                            <span className={chg > 0 ? "text-emerald-600 dark:text-emerald-400" : chg < 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-400"}>
                              {formatPercent(chg)}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-normal">n/a</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'fbx' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FBX_INDEX_DATA.map((fbx) => {
            const firstPt = fbx.points[0];
            const lastPt = fbx.points[fbx.points.length - 1];
            const totalChg = calculatePercentageChange(lastPt[2], firstPt[2]);

            return (
              <div key={fbx.name} className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">{fbx.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    FBX Weekly
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#182234]">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Latest (20 Oct):</span>
                    <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">{lastPt[1]} / FEU</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Δ vs {firstPt[0]}:</span>
                    <span className={`text-sm font-bold font-mono ${totalChg && totalChg < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {formatPercent(totalChg)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {fbx.points.map((pt, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]">
                      {pt[0]}: <strong>{pt[1]}</strong>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'capacity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 text-sm">
              Asia–Europe Blank Sailing Escalation
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Carriers have announced <strong>8 blank sailings</strong> for next week (up from 2) to halt spot price erosion before 2027 enterprise contract negotiations.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
            <h3 className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
              Q1 2027 Suez Restoration Projection
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Freightos forecasts full return to Suez in Q1 2027. Bypassing the Cape saves 10–14 days, releasing ~8–10% effective vessel supply.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
