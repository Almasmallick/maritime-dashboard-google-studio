import React, { useState } from 'react';
import { formatCurrency } from '../../data/maritimeData';

export interface LineSeries {
  id: string;
  name: string;
  color: string;
  values: (number | null)[];
}

interface LineChartProps {
  dates: string[];
  series: LineSeries[];
  height?: number;
  unit?: string;
  title?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  dates,
  series,
  height = 220,
  unit = "USD/FEU"
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Extract all non-null points to calculate min/max
  const allValues = series.flatMap(s => s.values.filter((v): v is number => v !== null));
  if (allValues.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-slate-400">
        No numeric series data available for selected filter
      </div>
    );
  }

  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const padding = (rawMax - rawMin) * 0.12 || 200;
  const minVal = Math.max(0, Math.floor((rawMin - padding) / 500) * 500);
  const maxVal = Math.ceil((rawMax + padding) / 500) * 500;

  const w = 620;
  const h = height;
  const padLeft = 52;
  const padRight = 60;
  const padTop = 20;
  const padBottom = 32;

  const getX = (idx: number) => {
    return padLeft + (idx * (w - padLeft - padRight)) / (dates.length - 1 || 1);
  };

  const getY = (val: number) => {
    return h - padBottom - ((val - minVal) / (maxVal - minVal || 1)) * (h - padTop - padBottom);
  };

  // Generate 4 horizontal grid lines
  const gridTicks = [minVal, minVal + (maxVal - minVal) * 0.33, minVal + (maxVal - minVal) * 0.66, maxVal];

  return (
    <div className="w-full select-none">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto overflow-visible font-mono text-[10px]"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Horizontal grid lines and value labels */}
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
                className="text-slate-700/60"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <text
                x={padLeft - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-slate-400 text-[9px] tabular-nums"
              >
                ${Math.round(tick).toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Vertical X-axis date labels */}
        {dates.map((date, idx) => {
          const x = getX(idx);
          return (
            <g key={idx}>
              <line
                x1={x}
                y1={padTop}
                x2={x}
                y2={h - padBottom}
                stroke="currentColor"
                className="text-slate-800/40"
                strokeDasharray="2 4"
                strokeWidth={1}
              />
              <text
                x={x}
                y={h - 10}
                textAnchor="middle"
                className="fill-slate-300 font-sans text-[10.5px] font-medium"
              >
                {date}
              </text>
            </g>
          );
        })}

        {/* Lines and points */}
        {series.map((s) => {
          const points = s.values
            .map((val, idx) => (val !== null ? { x: getX(idx), y: getY(val), val, idx } : null))
            .filter((p): p is { x: number; y: number; val: number; idx: number } => p !== null);

          if (points.length === 0) return null;

          const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

          const lastPoint = points[points.length - 1];

          return (
            <g key={s.id}>
              {/* Path line */}
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
                className="transition-all duration-200"
              />

              {/* Data circles */}
              {points.map((p, pIdx) => (
                <g key={pIdx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredIdx === p.idx ? 5 : 3.5}
                    fill={s.color}
                    stroke="#07101c"
                    strokeWidth={1.5}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredIdx(p.idx)}
                  />
                </g>
              ))}

              {/* End of line label */}
              {lastPoint && (
                <text
                  x={lastPoint.x + 8}
                  y={lastPoint.y + 3}
                  fill={s.color}
                  className="font-sans text-[10px] font-semibold tracking-tight"
                >
                  {s.id}
                </text>
              )}
            </g>
          );
        })}

        {/* Interactive Hover crosshair and tooltip */}
        {hoveredIdx !== null && (
          <g>
            <line
              x1={getX(hoveredIdx)}
              y1={padTop}
              x2={getX(hoveredIdx)}
              y2={h - padBottom}
              stroke="#5cc2b4"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              opacity={0.8}
            />
          </g>
        )}
      </svg>

      {/* Dynamic legend below */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-2 border-t border-slate-800/60 text-xs">
        {series.map(s => {
          const valAtHover = hoveredIdx !== null ? s.values[hoveredIdx] : s.values[s.values.length - 1];
          return (
            <div key={s.id} className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: s.color }} />
              <span className="font-medium text-slate-200">{s.id}:</span>
              <span className="font-mono text-slate-400">
                {valAtHover !== null ? formatCurrency(valAtHover) : "n/a"} {unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
