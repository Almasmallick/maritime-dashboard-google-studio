import React from 'react';
import { X, ExternalLink, ShieldCheck, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { OpportunitySignal, HardestFallSignal, MarketDevelopment } from '../types';

interface DetailDossierProps {
  item: OpportunitySignal | HardestFallSignal | MarketDevelopment | null;
  onClose: () => void;
}

export const DetailDossier: React.FC<DetailDossierProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isOpp = 'commercialHypothesis' in item;
  const isFall = 'plausibleDriver' in item && 'confirmationCheck' in item;
  const isDev = 'whatChanged' in item && 'whyItMatters' in item;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg h-full bg-white dark:bg-[#121826] border-l border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400">
              {isOpp ? 'Opportunity Signal' : isFall ? 'Deterioration Signal' : 'Market Signal'}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {'date' in item ? item.date : ('observationDate' in item ? item.observationDate : '24 Oct 2026')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {'name' in item ? item.name : item.title}
            </h3>
            <div className="mt-1 text-slate-500 dark:text-slate-400 text-xs">
              {isOpp && <span>Corridor: {item.scope}</span>}
              {isFall && <span>Classification: {item.classification} · Kind: {item.kind.toUpperCase()}</span>}
              {isDev && <span>Category: {item.category}</span>}
            </div>
          </div>

          {/* Metric Highlight Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Observed Metric &amp; Comparison
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {isOpp && item.metric}
              {isFall && (item.changePct !== null ? `${item.changePct > 0 ? '+' : ''}${item.changePct.toFixed(1)}% (${item.basis})` : item.basis)}
              {isDev && item.whatChanged}
            </div>
            {isOpp && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Baseline: {item.comparisonPeriod}
              </div>
            )}
          </div>

          {/* Sourced Evidence */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#182234] border border-slate-100 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              <span>Sourced Evidence</span>
              {'evidenceCount' in item && (
                <span className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {item.evidenceCount} sources
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              {isOpp && item.evidenceText}
              {isFall && `Published by ${item.source} (${item.observationDate}).`}
              {isDev && item.evidence}
            </p>
          </div>

          {/* Implication / Hypotheses */}
          {isOpp && (
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-[11px]">
                <strong className="block mb-0.5 font-bold">Commercial Implication:</strong>
                {item.commercialHypothesis}
              </div>
              <div className="text-slate-600 dark:text-slate-300 text-xs">
                <strong>Beneficiaries:</strong> {item.whoCouldBenefit}
              </div>
            </div>
          )}

          {isFall && (
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px]">
                <strong className="block mb-0.5 font-bold">Plausible Driver:</strong>
                {item.plausibleDriver}
              </div>
              <div className="text-slate-600 dark:text-slate-300 text-xs">
                <strong>Exposed:</strong> {item.exposedStakeholders}
              </div>
            </div>
          )}

          {/* Risks / Checks */}
          {isOpp && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-[11px]">
              <strong className="block mb-0.5 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Margin Risks:</span>
              </strong>
              {item.risksAndCounterEvidence}
            </div>
          )}

          {isFall && (
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
              <strong className="block mb-0.5 font-bold flex items-center gap-1 text-slate-900 dark:text-white">
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-500" />
                <span>Confirmation Check:</span>
              </strong>
              {item.confirmationCheck}
            </div>
          )}

          {isDev && (
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
              <strong className="block mb-0.5 font-bold text-slate-900 dark:text-white">Next Investigation Steps:</strong>
              {item.nextSteps}
            </div>
          )}

          {/* Source Link */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Source: {item.source}</span>
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
