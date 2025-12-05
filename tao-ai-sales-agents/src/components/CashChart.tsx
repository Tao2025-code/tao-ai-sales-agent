import React from "react";
import { styles } from "../styles";
import { usd0 } from "../utils";

type CashChartProps = {
  data: number[];
  height?: number;
  width?: number;
  title?: string;
};

export const CashChart: React.FC<CashChartProps> = ({
  data,
  height = 260,
  width = 720,
  title,
}) => {
  const pad = { top: 24, right: 24, bottom: 36, left: 64 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const minY = Math.min(0, Math.min(...data));
  const maxY = Math.max(0, Math.max(...data));
  const yPad = (maxY - minY) * 0.1 || 1;
  const y0 = minY - yPad;
  const y1 = maxY + yPad;

  const x = (i: number) => pad.left + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.top + innerH - ((v - y0) / (y1 - y0)) * innerH;

  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`)
    .join(" ");

  const zeroY = y(0);
  const xTicks = data.map((_, i) => i + 1);
  const yTicks = 5;
  const yTickVals = Array.from({ length: yTicks }, (_, i) => y0 + (i * (y1 - y0)) / (yTicks - 1));
  const localMaxDeficit = Math.min(...data);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={styles.svg}>
      {title && (
        <text x={pad.left} y={18} fontSize={14} fontWeight={600} fill="#1f2937">
          {title}
        </text>
      )}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={height - pad.bottom} stroke="#e5e7eb" />
      <line
        x1={pad.left}
        y1={height - pad.bottom}
        x2={width - pad.right}
        y2={height - pad.bottom}
        stroke="#e5e7eb"
      />
      <line
        x1={pad.left}
        y1={zeroY}
        x2={width - pad.right}
        y2={zeroY}
        stroke="#9ca3af"
        strokeDasharray="4 4"
      />
      {yTickVals.map((v, idx) => (
        <g key={idx}>
          <text x={pad.left - 8} y={y(v) + 4} fontSize={11} textAnchor="end" fill="#6b7280">
            {usd0(v)}
          </text>
          <line x1={pad.left} y1={y(v)} x2={width - pad.right} y2={y(v)} stroke="#f3f4f6" />
        </g>
      ))}
      {xTicks.map((m, idx) => (
        <g key={idx}>
          <text
            x={x(idx)}
            y={height - pad.bottom + 16}
            fontSize={11}
            textAnchor="middle"
            fill="#6b7280"
          >
            {m}
          </text>
        </g>
      ))}
      <path
        d={[
          `M ${pad.left} ${zeroY}`,
          ...data.map((v, i) => `L ${x(i)} ${Math.max(y(v), zeroY)}`),
          `L ${pad.left + innerW} ${zeroY}`,
          "Z",
        ].join(" ")}
        fill="#fee2e2"
      />
      <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} fill="#2563eb" />
      ))}
      <g>
        <circle cx={x(2)} cy={y(data[2])} r={4.5} fill="#ef4444" />
        <text x={x(2) + 8} y={y(data[2]) - 8} fontSize={12} fill="#ef4444">
          Déficit máximo {usd0(localMaxDeficit)}
        </text>
      </g>
    </svg>
  );
};

export default CashChart;
