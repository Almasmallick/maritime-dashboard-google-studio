import React from 'react';

interface Segment {
  label: string;
  value: number;
  color: string;
  countLabel?: string;
}

interface RadialMeterProps {
  title: string;
  centerValue: string;
  centerLabel: string;
  segments: Segment[];
  size?: number;
}

export const RadialMeter: React.FC<RadialMeterProps> = ({
  title,
  centerValue,
  centerLabel,
  segments,
  size = 180
}) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col items-center justify-between h-full select-none">
      <div className="relative flex items-center justify-center my-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
          />

          {/* Slices */}
          {segments.map((seg, i) => {
            const percent = seg.value / total;
            const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
            const strokeDashoffset = -circumference * accumulatedPercent;
            accumulatedPercent += percent;

            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 hover:opacity-80 cursor-pointer"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
            {centerValue}
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {centerLabel}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="truncate text-[11px] font-medium">{seg.label}</span>
            </div>
            <span className="font-mono font-semibold text-[11px] text-slate-900 dark:text-white shrink-0 ml-1">
              {seg.countLabel || `${Math.round((seg.value / total) * 100)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
