import React, { useState } from 'react';
import { Calculator, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { LANES_DATA, formatCurrency } from '../data/maritimeData';
import { CostWaterfall, WaterfallItem } from '../components/charts/CostWaterfall';

export const LandedCostView: React.FC = () => {
  const availableLanes = LANES_DATA.filter(l => l.rates[2] !== null);

  const [selectedLaneId, setSelectedLaneId] = useState<string>(availableLanes[0].id);
  const [freightShiftPct, setFreightShiftPct] = useState<number>(0);
  const [addedDelayDays, setAddedDelayDays] = useState<number>(0);

  const [cargoValue, setCargoValue] = useState<number>(38000);
  const [insurancePct, setInsurancePct] = useState<number>(0.3);
  const [originCharges, setOriginCharges] = useState<number>(320);
  const [destCharges, setDestCharges] = useState<number>(410);
  const [inlandTransport, setInlandTransport] = useState<number>(380);
  const [dutyPct, setDutyPct] = useState<number>(7.5);
  const [freeDays, setFreeDays] = useState<number>(5);
  const [demurragePerDay, setDemurragePerDay] = useState<number>(140);
  const [storagePerDay, setStoragePerDay] = useState<number>(90);

  const activeLane = availableLanes.find(l => l.id === selectedLaneId) || availableLanes[0];
  const baseOceanRate = activeLane.rates[2] as number;
  const adjustedOceanRate = baseOceanRate * (1 + freightShiftPct / 100);

  const insuranceCost = cargoValue * (insurancePct / 100);
  const cifValue = cargoValue + adjustedOceanRate + insuranceCost;
  const customsDuty = cifValue * (dutyPct / 100);

  const excessDays = Math.max(0, addedDelayDays - freeDays);
  const storageCost = excessDays * storagePerDay;
  const demurrageCost = excessDays * demurragePerDay;

  const waterfallItems: WaterfallItem[] = [
    { label: "Ocean", value: adjustedOceanRate },
    { label: "Insur.", value: insuranceCost },
    { label: "Origin", value: originCharges },
    { label: "Dest.", value: destCharges },
    { label: "Inland", value: inlandTransport },
    { label: "Duty", value: customsDuty },
    { label: "Storage", value: storageCost, isPenalty: storageCost > 0 },
    { label: "Dem/Det", value: demurrageCost, isPenalty: demurrageCost > 0 }
  ];

  const totalLandedCost = waterfallItems.reduce((acc, curr) => acc + curr.value, 0);

  const handleReset = () => {
    setFreightShiftPct(0);
    setAddedDelayDays(0);
    setCargoValue(38000);
    setInsurancePct(0.3);
    setOriginCharges(320);
    setDestCharges(410);
    setInlandTransport(380);
    setDutyPct(7.5);
    setFreeDays(5);
    setDemurragePerDay(140);
    setStoragePerDay(90);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Landed Cost &amp; Delay Sensitivity</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              Per 40ft (FEU)
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate how rate shifts and port dwell penalties compound landed expenditure.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Waterfall Card */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Cost Breakdown Waterfall
              </h2>
              <span className="text-base font-mono font-bold text-blue-600 dark:text-cyan-400">
                Total: {formatCurrency(totalLandedCost)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Base ocean rate: ${Math.round(adjustedOceanRate).toLocaleString()} ({freightShiftPct >= 0 ? '+' : ''}{freightShiftPct}%)
            </p>
          </div>

          <div className="my-2">
            <CostWaterfall items={waterfallItems} total={totalLandedCost} height={210} />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#182234]">
              <div className="text-[10.5px] text-slate-400">Ocean Freight</div>
              <div className="font-mono font-bold text-blue-600 dark:text-cyan-400 mt-0.5">{formatCurrency(adjustedOceanRate)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#182234]">
              <div className="text-[10.5px] text-slate-400">Handling &amp; Duty</div>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{formatCurrency(customsDuty + originCharges + destCharges + inlandTransport + insuranceCost)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#182234]">
              <div className="text-[10.5px] text-slate-400">Demurrage Penalties</div>
              <div className={`font-mono font-bold mt-0.5 ${demurrageCost + storageCost > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`}>
                {formatCurrency(demurrageCost + storageCost)}
              </div>
            </div>
          </div>
        </div>

        {/* Sliders & Inputs Card */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Scenario Parameters
          </h2>

          <div className="space-y-1">
            <label className="text-slate-500 text-xs block">Benchmark Ocean Lane</label>
            <select
              value={selectedLaneId}
              onChange={(e) => setSelectedLaneId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#182234] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-cyan-500 focus:outline-none"
            >
              {availableLanes.map(lane => (
                <option key={lane.id} value={lane.id}>
                  {lane.name} (${lane.rates[2]?.toLocaleString()}/FEU)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Spot Rate Shift</span>
              <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                {freightShiftPct > 0 ? `+${freightShiftPct}%` : `${freightShiftPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="40"
              step="5"
              value={freightShiftPct}
              onChange={(e) => setFreightShiftPct(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1 p-3.5 rounded-xl bg-slate-50 dark:bg-[#182234] border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Port Delay Days</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {addedDelayDays} Days ({Math.max(0, addedDelayDays - freeDays)}d demurrage)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              value={addedDelayDays}
              onChange={(e) => setAddedDelayDays(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="text-[10.5px] text-slate-400 block mb-0.5">Cargo Value ($)</label>
              <input
                type="number"
                value={cargoValue}
                onChange={(e) => setCargoValue(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#182234] border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[10.5px] text-slate-400 block mb-0.5">Duty % (CIF)</label>
              <input
                type="number"
                step="0.5"
                value={dutyPct}
                onChange={(e) => setDutyPct(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#182234] border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[10.5px] text-slate-400 block mb-0.5">Origin THC ($)</label>
              <input
                type="number"
                value={originCharges}
                onChange={(e) => setOriginCharges(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#182234] border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[10.5px] text-slate-400 block mb-0.5">Demurrage / Day ($)</label>
              <input
                type="number"
                value={demurragePerDay}
                onChange={(e) => setDemurragePerDay(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#182234] border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
