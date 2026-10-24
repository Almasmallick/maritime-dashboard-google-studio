import React from 'react';
import { formatCurrency } from '../../data/maritimeData';

export interface WaterfallItem {
  label: string;
  value: number;
  isPenalty?: boolean;
}

interface CostWaterfallProps {
  items: WaterfallItem[];
  total: number;
  width?: number;
  height?: number;
}

export const CostWaterfall: React.FC<CostWaterfallProps> = ({
  items,
  total,
  width = 620,
  height = 220
}) => {
  const maxVal = Math.max(total, 1);
  const padBottom = 34;
  const padTop = 26;
  const padLeft = 40;
  const padRight = 30;
  const availableWidth = width - padLeft - padRight;
  const totalSlots = items.length + 1; // +1 for Total bar
  const colWidth = Math.min(availableWidth / totalSlots - 6, 52);
  const chartHeight = height - padTop - padBottom;

  const getY = (val: number) => {
    return height - padBottom - (val / maxVal) * chartHeight;
  };

  let cumulative = 0;

  return (
    <div className="w-full overflow-x-auto select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[520px] font-sans text-xs">
        {/* Background baseline */}
        <line
          x1={padLeft}
          y1={height - padBottom}
          x2={width - padRight}
          y2={height - padBottom}
          stroke="currentColor"
          className="text-slate-700"
          strokeWidth={1}
        />

        {items.map((item, i) => {
          const x = padLeft + i * (colWidth + 8);
          const barTopY = getY(cumulative + item.value);
          const barBottomY = getY(cumulative);
          const barH = Math.max(Math.abs(barBottomY - barTopY), 2);
          
          cumulative += item.value;
          const barColor = item.isPenalty ? "#ec7563" : item.label === "Ocean" ? "#5cc2b4" : "#dcaa4a";

          return (
            <g key={i} className="group">
              {/* Connector line from previous bar */}
              {i > 0 && (
                <line
                  x1={x - 8}
                  y1={barBottomY}
                  x2={x}
                  y2={barBottomY}
                  stroke="currentColor"
                  className="text-slate-600"
                  strokeDasharray="2 2"
                  strokeWidth={1}
                />
              )}

              {/* Bar */}
              <rect
                x={x}
                y={barTopY}
                width={colWidth}
                height={barH}
                fill={barColor}
                opacity={0.88}
                rx={3}
                className="transition-all duration-200 group-hover:opacity-100"
              />

              {/* Value on top of bar */}
              <text
                x={x + colWidth / 2}
                y={barTopY - 5}
                textAnchor="middle"
                className="fill-slate-300 font-mono text-[9.5px] font-semibold tabular-nums"
              >
                ${Math.round(item.value).toLocaleString()}
              </text>

              {/* Category label below */}
              <text
                x={x + colWidth / 2}
                y={height - 12}
                textAnchor="middle"
                className="fill-slate-400 font-medium text-[10px]"
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Total Bar */}
        {(() => {
          const totalX = padLeft + items.length * (colWidth + 8);
          const totalTopY = getY(total);
          const totalH = Math.max(height - padBottom - totalTopY, 2);

          return (
            <g className="group">
              <rect
                x={totalX}
                y={totalTopY}
                width={colWidth}
                height={totalH}
                fill="#e4ecf5"
                opacity={0.9}
                rx={3}
              />
              <text
                x={totalX + colWidth / 2}
                y={totalTopY - 6}
                textAnchor="middle"
                className="fill-teal-400 font-mono text-[11px] font-bold tabular-nums"
              >
                {formatCurrency(total)}
              </text>
              <text
                x={totalX + colWidth / 2}
                y={height - 12}
                textAnchor="middle"
                className="fill-teal-300 font-bold text-[10.5px]"
              >
                Total
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};
