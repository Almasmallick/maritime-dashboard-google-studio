import React, { useState } from 'react';
import { formatCurrency } from '../../data/maritimeData';

export interface AreaSeries {
  id: string;
  name: string;
  color: string;
  gradientId: string;
  values: (number | null)[];
}

interface SmoothAreaChartProps {
  dates: string[];
  series: AreaSeries[];
  height?: number;
  unit?: string;
  onSelectPoint?: (date: string, value: number, seriesName: string) => void;
}

export const SmoothAreaChart: React.FC<SmoothAreaChartProps> = ({
  dates,
  series,
  height = 240,
  unit = "USD/FEU"
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const allValues = series.flatMap(s => s.values.filter((v): v is number => v !== null));
  if (allValues.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-slate-400">
        No series data available
      </div>
    );
  }

  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const minVal = Math.max(0, Math.floor((rawMin * 0.85) / 500) * 500);
  const maxVal = Math.ceil((rawMax * 1.08) / 500) * 500;

  const w = 700;
  const h = height;
  const padLeft = 56;
  const padRight = 36;
  const padTop = 24;
  const padBottom = 36;

  const getX = (idx: number) => {
    return padLeft + (idx * (w - padLeft - padRight)) / (dates.length - 1 || 1);
  };

  const getY = (val: number) => {
    return h - padBottom - ((val - minVal) / (maxVal - minVal || 1)) * (h - padTop - padBottom);
  };

  // Convert points to smooth bezier path
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) * 0.45;
      const cpY1 = p0.y;
      const cpX2 = p1.x - (p1.x - p0.x) * 0.45;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const gridTicks = [minVal, minVal + (maxVal - minVal) * 0.33, minVal + (maxVal - minVal) * 0.66, maxVal];

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          {series.map(s => (
            <linearGradient key={s.gradientId} id={s.gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="70%" stopColor={s.color} stopOpacity="0.04" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
            </linearGradient>
          ))}
        </defs>

        {/* Grid lines */}
        {gridTicks.map((tick, i) => {
          const y = getY(tick);
          return (
            <g key={i}>
              <line
                x1={padLeft}
                y1={y}
                x2={w - padRight}
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800/80"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <text
                x={padLeft - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-400 dark:fill-slate-500 font-mono text-[10px] tabular-nums"
              >
                ${Math.round(tick).toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {dates.map((date, idx) => {
          const x = getX(idx);
          return (
            <text
              key={idx}
              x={x}
              y={h - 10}
              textAnchor="middle"
              className="fill-slate-500 dark:fill-slate-400 text-[11px] font-medium"
            >
              {date}
            </text>
          );
        })}

        {/* Series area & paths */}
        {series.map(s => {
          const validPoints = s.values
            .map((val, idx) => (val !== null ? { x: getX(idx), y: getY(val), val, idx } : null))
            .filter((p): p is { x: number; y: number; val: number; idx: number } => p !== null);

          if (validPoints.length === 0) return null;

          const smoothLine = createSmoothPath(validPoints);
          const areaPath = `${smoothLine} L ${validPoints[validPoints.length - 1].x} ${h - padBottom} L ${validPoints[0].x} ${h - padBottom} Z`;

          return (
            <g key={s.id}>
              {/* Shaded Area */}
              <path
                d={areaPath}
                fill={`url(#${s.gradientId})`}
                className="transition-all duration-300"
              />

              {/* Glowing Line */}
              <path
                d={smoothLine}
                fill="none"
                stroke={s.color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />

              {/* Data circles */}
              {validPoints.map(p => {
                const isHovered = hoveredIdx === p.idx;
                return (
                  <g key={p.idx} onMouseEnter={() => setHoveredIdx(p.idx)} className="cursor-pointer">
                    {isHovered && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={8}
                        fill={s.color}
                        opacity={0.3}
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 5.5 : 4}
                      fill={s.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="transition-all shadow-md"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Hover Crosshair & Floating Tooltip */}
        {hoveredIdx !== null && (
          <g>
            <line
              x1={getX(hoveredIdx)}
              y1={padTop}
              x2={getX(hoveredIdx)}
              y2={h - padBottom}
              stroke="currentColor"
              className="text-cyan-500/50"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
          </g>
        )}
      </svg>

      {/* Modern Tooltip badge on hover */}
      {hoveredIdx !== null && (
        <div 
          className="absolute z-20 top-2 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700/60 pointer-events-none transition-all flex items-center gap-3 text-xs"
          style={{ left: `clamp(10%, ${getX(hoveredIdx) * 100 / w}%, 80%)`, transform: 'translateX(-50%)' }}
        >
          <div className="font-semibold text-slate-300 border-r border-slate-700 pr-2.5">
            {dates[hoveredIdx]}
          </div>
          <div className="flex items-center gap-3">
            {series.map(s => {
              const val = s.values[hoveredIdx];
              return (
                <div key={s.id} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] text-slate-400">{s.id}:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {val !== null ? formatCurrency(val) : 'n/a'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sleek Legend Pill Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          {series.map(s => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-2xs"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span>{s.name}</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white ml-0.5">
                {s.values[s.values.length - 1] !== null ? formatCurrency(s.values[s.values.length - 1]) : 'n/a'}
              </span>
            </div>
          ))}
        </div>
        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
          Unit: {unit}
        </div>
      </div>
    </div>
  );
};
