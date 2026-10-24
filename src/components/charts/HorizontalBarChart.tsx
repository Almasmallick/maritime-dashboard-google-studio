import React from 'react';
import { formatPercent } from '../../data/maritimeData';

export interface BarRow {
  id: string;
  label: string;
  sublabel?: string;
  value: number;
  highlight?: boolean;
}

interface HorizontalBarChartProps {
  rows: BarRow[];
  unit?: string;
  width?: number;
  showZeroAxis?: boolean;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  rows,
  width = 560,
  showZeroAxis = true
}) => {
  if (rows.length === 0) {
    return (
      <div className="py-6 text-center text-xs text-slate-400">
        No comparative observations match criteria
      </div>
    );
  }

  // Find max absolute value for scale
  const maxAbs = Math.max(...rows.map(r => Math.abs(r.value)), 1);
  const rowHeight = 28;
  const h = rows.length * rowHeight + 16;
  const labelWidth = 140;
  const valueWidth = 60;
  const chartWidth = width - labelWidth - valueWidth;
  const zeroX = labelWidth + chartWidth / 2;

  return (
    <div className="w-full overflow-x-auto select-none">
      <svg viewBox={`0 0 ${width} ${h}`} className="w-full min-w-[480px] font-sans text-xs">
        {/* Zero baseline vertical guideline */}
        {showZeroAxis && (
          <line
            x1={zeroX}
            y1={4}
            x2={zeroX}
            y2={h - 6}
            stroke="currentColor"
            className="text-slate-700"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
        )}

        {rows.map((row, i) => {
          const y = i * rowHeight + 10;
          const isNegative = row.value < 0;
          const barLength = (Math.abs(row.value) / maxAbs) * (chartWidth / 2 - 12);
          const barX = isNegative ? zeroX - barLength : zeroX;
          const barColor = isNegative ? "#ec7563" : "#62cc8b";

          return (
            <g key={row.id || i} className="group hover:opacity-95">
              {/* Row background highlight on hover */}
              <rect
                x={0}
                y={y - 8}
                width={width}
                height={rowHeight - 2}
                fill="currentColor"
                className="text-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity"
                rx={3}
              />

              {/* Lane or Item Label */}
              <text
                x={labelWidth - 8}
                y={y + 6}
                textAnchor="end"
                className="fill-slate-300 font-medium text-[11px]"
              >
                {row.label.length > 24 ? row.label.slice(0, 24) + '…' : row.label}
              </text>

              {/* The Bar */}
              <rect
                x={barX}
                y={y - 4}
                width={Math.max(barLength, 2)}
                height={14}
                fill={barColor}
                opacity={0.88}
                rx={2.5}
                className="transition-all duration-300"
              />

              {/* Value Label */}
              <text
                x={isNegative ? barX - 6 : barX + barLength + 6}
                y={y + 6}
                textAnchor={isNegative ? "end" : "start"}
                fill={barColor}
                className="font-mono text-[10.5px] font-semibold tabular-nums"
              >
                {formatPercent(row.value)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
