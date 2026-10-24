import React from 'react';
import { Anchor, ExternalLink, Compass } from 'lucide-react';
import { CHOKEPOINTS_DATA } from '../data/maritimeData';

export const PortsDisruptionView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Ports &amp; Chokepoint Status</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              Verified Readings
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational bottlenecks, vessel turnarounds, and security advisories.
          </p>
        </div>
      </div>

      {/* Chokepoint Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHOKEPOINTS_DATA.map((choke) => {
          const statusConfig = {
            up: { badge: 'Improving', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
            wa: { badge: 'Warning', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
            dn: { badge: 'High Risk', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', dot: 'bg-rose-500' },
            mu: { badge: 'Dated', color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800', dot: 'bg-slate-400' }
          }[choke.status];

          return (
            <div
              key={choke.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[11px] font-mono text-slate-400">{choke.region}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                    {statusConfig.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{choke.node}</h3>

                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#182234] text-xs text-slate-700 dark:text-slate-200 font-medium">
                  {choke.reading}
                </div>

                <div className="mt-3 text-xs space-y-1">
                  <span className="font-semibold text-slate-400 text-[10.5px] uppercase tracking-wider block">
                    Advisory:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                    {choke.actionGuidance}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{choke.source}</span>
                {choke.sourceUrl && (
                  <a
                    href={choke.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
