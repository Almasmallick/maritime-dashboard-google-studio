import React from 'react';
import { 
  Compass, 
  TrendingUp, 
  TrendingDown, 
  Ship, 
  Globe2, 
  Anchor, 
  Calculator, 
  Database,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export type NavView = 
  | 'pulse' 
  | 'opps' 
  | 'falls' 
  | 'freight' 
  | 'india' 
  | 'ports' 
  | 'landed' 
  | 'sources';

interface SidebarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  collapsed?: boolean;
}

export const NAV_ITEMS: { id: NavView; label: string; icon: React.ElementType; badge?: string; badgeColor?: string }[] = [
  { id: 'pulse', label: 'Market Pulse', icon: Compass },
  { id: 'opps', label: 'Opportunities', icon: TrendingUp, badge: '4 Signals', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  { id: 'falls', label: 'Hardest Falls', icon: TrendingDown, badge: '6 Risks', badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
  { id: 'freight', label: 'Freight & Capacity', icon: Ship, badge: '8 Blanks', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  { id: 'india', label: 'India Trade Lens', icon: Globe2 },
  { id: 'ports', label: 'Ports & Chokepoints', icon: Anchor },
  { id: 'landed', label: 'Landed Cost What-If', icon: Calculator },
  { id: 'sources', label: 'Sources & Methodology', icon: Database },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  return (
    <aside className="w-64 flex-none border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0e1422] flex flex-col justify-between select-none transition-all duration-200 z-30">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/25">
              <Compass className="w-5 h-5 animate-[spin_16s_linear_infinite]" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>NaviQ</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/20">
                  PRO
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-tight">
                Maritime Freight Terminal
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Intelligence Modules
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white dark:text-slate-950' : 'text-slate-400 dark:text-slate-500'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      isActive 
                        ? 'bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950 font-bold' 
                        : item.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Verified Data Integrity Badge Card at Bottom (Like Shopeers Upgrade / Status Card) */}
      <div className="p-4 space-y-3">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-900/10 via-cyan-900/10 to-teal-900/10 dark:from-slate-800/80 dark:to-slate-900/90 border border-blue-200/50 dark:border-slate-700/60 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Verified Evidence
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Sourced 24 Oct 2026 snapshot. Zero fabricated AIS vessel positions.
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10.5px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Feed Synced
            </span>
            <span className="text-slate-400 font-mono">Drewry · FBX</span>
          </div>
        </div>

        {/* User Desk Profile */}
        <div className="pt-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              FD
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Freight Desk</div>
              <div className="text-[10px] text-slate-400 font-mono">Global Macro</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
