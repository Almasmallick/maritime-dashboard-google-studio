import React from 'react';
import { 
  Search, 
  Download, 
  Sun, 
  Moon, 
  Filter, 
  Calendar,
  Bell,
  Sparkles,
  Command
} from 'lucide-react';
import { LANES_DATA, BASELINE_DATES, SNAPSHOT_LABEL } from '../data/maritimeData';

interface TopToolbarProps {
  selectedLane: string;
  onSelectLane: (laneId: string) => void;
  baselineIndex: number;
  onSelectBaseline: (idx: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onExportCSV: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  selectedLane,
  onSelectLane,
  baselineIndex,
  onSelectBaseline,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
  onExportCSV
}) => {
  return (
    <header className="h-16 px-6 bg-white dark:bg-[#0e1422] border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4 text-xs z-20 shrink-0">
      {/* Search Input with ⌘K Badge */}
      <div className="relative w-64 md:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search lanes, ports, commodities..."
          className="w-full bg-slate-100 dark:bg-slate-800/70 border border-transparent focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs rounded-xl pl-9 pr-14 py-2 focus:outline-none transition-all shadow-2xs"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 font-mono pointer-events-none">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </div>

      {/* Center Controls: Filter Pills */}
      <div className="hidden lg:flex items-center gap-2.5">
        {/* Baseline Selector Pills */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/50">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-2 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-500" />
            Baseline:
          </span>
          {BASELINE_DATES.map((b) => {
            const isSelected = baselineIndex === b.index;
            return (
              <button
                key={b.index}
                onClick={() => onSelectBaseline(b.index)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-cyan-400 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {b.shortLabel} {b.index === 0 ? '(Summer Peak)' : '(Autumn Trough)'}
              </button>
            );
          })}
        </div>

        {/* Lane Selector */}
        <div className="flex items-center gap-1.5 pl-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedLane}
            onChange={(e) => onSelectLane(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800/70 border border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl px-3 py-1.5 focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Trade Corridors (8)</option>
            {LANES_DATA.map((lane) => (
              <option key={lane.id} value={lane.id}>
                {lane.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls: Freshness, Theme, CSV Export */}
      <div className="flex items-center gap-3">
        {/* Freshness Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Oct 24 Snapshot</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-2xs"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Export CSV Button (Eye-catching primary CTA like Shopeers Export button) */}
        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Data</span>
        </button>
      </div>
    </header>
  );
};
