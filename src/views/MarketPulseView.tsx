import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowUpRight, 
  ChevronRight, 
  Anchor, 
  Ship, 
  Clock, 
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  WCI_COMPOSITE, 
  LANES_DATA, 
  MARKET_DEVELOPMENTS, 
  OPPORTUNITIES_DATA, 
  HARDEST_FALLS_DATA,
  BASELINE_DATES,
  calculatePercentageChange,
  formatCurrency,
  formatPercent
} from '../data/maritimeData';
import { SmoothAreaChart, AreaSeries } from '../components/charts/SmoothAreaChart';
import { RadialMeter } from '../components/charts/RadialMeter';
import { MarketDevelopment, OpportunitySignal, HardestFallSignal } from '../types';

interface MarketPulseViewProps {
  selectedLane: string;
  baselineIndex: number;
  searchQuery: string;
  onSelectLane: (laneId: string) => void;
  onOpenDossier: (item: MarketDevelopment | OpportunitySignal | HardestFallSignal) => void;
  onNavigate: (viewId: any) => void;
}

export const MarketPulseView: React.FC<MarketPulseViewProps> = ({
  selectedLane,
  baselineIndex,
  searchQuery,
  onSelectLane,
  onOpenDossier,
  onNavigate
}) => {
  const latestWCI = WCI_COMPOSITE[WCI_COMPOSITE.length - 1].value;
  const prevWCI = WCI_COMPOSITE[WCI_COMPOSITE.length - 2].value;
  const baseWCI = WCI_COMPOSITE[baselineIndex === 0 ? 0 : 1].value;
  const wciWoW = calculatePercentageChange(latestWCI, prevWCI);
  const wciBaseChg = calculatePercentageChange(latestWCI, baseWCI);
  const baseLabel = BASELINE_DATES[baselineIndex].shortLabel;

  // Filter lanes
  const filteredLanes = LANES_DATA.filter(l => {
    const matchesFilter = selectedLane === "ALL" || l.id === selectedLane;
    const matchesSearch = !searchQuery || 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Prepare series for smooth area chart
  const areaColors = [
    { color: '#0ea5e9', id: 'grad-sha-lax' },
    { color: '#8b5cf6', id: 'grad-sha-nyc' },
    { color: '#10b981', id: 'grad-sha-rtm' },
    { color: '#f59e0b', id: 'grad-sha-goa' }
  ];

  const chartSeries: AreaSeries[] = filteredLanes
    .filter(l => l.rates[2] !== null)
    .slice(0, 3)
    .map((l, i) => ({
      id: l.id,
      name: l.name,
      color: areaColors[i % areaColors.length].color,
      gradientId: areaColors[i % areaColors.length].id,
      values: l.rates
    }));

  // Segment status for radial meter
  const corridorSegments = [
    { label: 'Transpacific (Stable High)', value: 45, color: '#0ea5e9', countLabel: '$8.0K' },
    { label: 'Asia–Europe (Rebound)', value: 25, color: '#10b981', countLabel: '+8.8%' },
    { label: 'Hormuz / Gulf (Disrupted)', value: 18, color: '#ef4444', countLabel: 'High Risk' },
    { label: 'Transatlantic (Resilient)', value: 12, color: '#f59e0b', countLabel: '$3.1K' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Market Pulse
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time direction of ocean freight rates, blank sailings, and port choke points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>Assessed Week 42</span>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards (Shopeers & Vento Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-400/50 dark:hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Drewry WCI Composite
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-cyan-500/10 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              ${latestWCI.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              {formatPercent(wciWoW)}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-between">
            <span>vs. {baseLabel} baseline:</span>
            <span className="font-mono font-semibold text-slate-600 dark:text-slate-300">
              {formatPercent(wciBaseChg)}
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-400/50 dark:hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Shanghai → Los Angeles
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              $8,007
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              +5.0%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-between">
            <span>USWC route preference</span>
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+17.7% vs Aug</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-400/50 dark:hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Shanghai Port Waiting
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Anchor className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
              38 Hours
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              -61%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-between">
            <span>Berth clearing turnaround</span>
            <span className="font-mono text-slate-500">from 97h (wk 38)</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-400/50 dark:hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              India Sep Merch Exports
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              $44.40B
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              +23.0% YoY
            </span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-between">
            <span>Electronics &amp; Engineering</span>
            <span className="font-mono text-slate-500">Deficit $30.2B</span>
          </div>
        </div>
      </div>

      {/* Main Row: Spline Area Chart + Corridor Radial Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Chart Card */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Spot Freight Trajectories</span>
                <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
                  (USD / FEU)
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Drewry benchmark headhaul lanes across key seasonal checkpoints.
              </p>
            </div>

            <button
              onClick={() => onNavigate('freight')}
              className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <SmoothAreaChart
            dates={["20 Aug", "8 Oct", "22 Oct"]}
            series={chartSeries}
            height={220}
          />
        </div>

        {/* Right Radial Meter Card (Fintech/SaaS circular arc) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Corridor Volatility
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold">
              Q4 INDEX
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <RadialMeter
              title="Corridors"
              centerValue="$4,585"
              centerLabel="WCI Index"
              segments={corridorSegments}
              size={175}
            />
          </div>
        </div>
      </div>

      {/* Breaking Attention Signals (Eye-catching pill cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-start gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-1 animate-pulse" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-rose-700 dark:text-rose-400">Hormuz Crisis</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300">High Risk</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
              Feeder container ship sunk; P&amp;I war-risk insurance surcharges spike; oil touched ~$100/bbl.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-1" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-amber-700 dark:text-amber-400">Asia–Europe Blanks</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300">8 Sailings</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
              Carriers blanking 8 sailings next week vs 2 prior week; enforcing GRIs ahead of 2027 contracts.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-start gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0 mt-1" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-cyan-700 dark:text-cyan-400">Red Sea Projection</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">Q1 2027</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
              Full return expected in Q1 2027 by Freightos, which will release ~8-10% effective vessel supply.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Opportunities & Deteriorations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Opportunities List Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Evidence-Ranked Opportunities
                </h3>
              </div>
              <button
                onClick={() => onNavigate('opps')}
                className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
              >
                <span>View All ({OPPORTUNITIES_DATA.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {OPPORTUNITIES_DATA.slice(0, 3).map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => onOpenDossier(opp)}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors truncate">
                        {opp.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">
                      {opp.scope} · {opp.metric}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                      {opp.growthPct !== null ? formatPercent(opp.growthPct) : 'Active'}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {opp.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hardest Falls List Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Deterioration &amp; Price Falls
                </h3>
              </div>
              <button
                onClick={() => onNavigate('falls')}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-0.5"
              >
                <span>View All ({HARDEST_FALLS_DATA.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {HARDEST_FALLS_DATA.slice(0, 3).map((fall) => (
                <div
                  key={fall.id}
                  onClick={() => onOpenDossier(fall)}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60 hover:border-rose-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors truncate">
                        {fall.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">
                      {fall.basis}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
                      {fall.changePct !== null ? formatPercent(fall.changePct) : 'Disruption'}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      {fall.kind}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trade Corridors Summary Table (Clean, rounded card with no paragraph fluff) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Major Trade Lanes Spot Rates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              USD per 40ft container (FEU) · Compared to {baseLabel} baseline
            </p>
          </div>
          <button
            onClick={() => onNavigate('freight')}
            className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Full Freight Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-[11px]">
                <th className="py-3 px-3">Lane Corridor</th>
                <th className="py-3 px-3">Direction</th>
                <th className="py-3 px-3 font-mono">20 Aug</th>
                <th className="py-3 px-3 font-mono">8 Oct</th>
                <th className="py-3 px-3 font-mono text-slate-900 dark:text-white">22 Oct (Latest)</th>
                <th className="py-3 px-3 font-mono">Δ vs {baseLabel}</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredLanes.map((lane) => {
                const baseVal = lane.rates[baselineIndex];
                const latestVal = lane.rates[2];
                const chg = calculatePercentageChange(latestVal, baseVal);

                return (
                  <tr
                    key={lane.id}
                    onClick={() => onSelectLane(lane.id)}
                    className="hover:bg-slate-50 dark:hover:bg-[#182234] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                      {lane.name}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {lane.direction}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 dark:text-slate-500">
                      {formatCurrency(lane.rates[0])}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 dark:text-slate-500">
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
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
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
