import React from "react";

// Shared building blocks for the hand-authored architecture diagrams.
// Server-safe (pure SVG, no hooks) so detail pages stay Server Components.

export const COLORS = {
  stroke: "#475569", // slate-600
  boxFill: "#f8fafc", // slate-50
  boxStroke: "#94a3b8", // slate-400
  accentFill: "#eff6ff", // blue-50
  accentStroke: "#3b82f6", // blue-500
  storeFill: "#f5f3ff", // violet-50
  storeStroke: "#8b5cf6", // violet-500
  warnFill: "#fff7ed", // orange-50
  warnStroke: "#f97316", // orange-500
  text: "#1e293b", // slate-800
  muted: "#64748b", // slate-500
};

/** Wraps a diagram so wide ones scroll horizontally instead of breaking layout. */
export function DiagramFrame({
  children,
  caption,
  viewBox,
  minWidth = 720,
}: {
  children: React.ReactNode;
  caption: string;
  viewBox: string;
  minWidth?: number;
}) {
  return (
    <figure className="my-2">
      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white p-4">
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={caption}
          className="h-auto w-full"
          style={{ minWidth }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 z" fill={COLORS.stroke} />
            </marker>
            {/* auto-start-reverse flips this when used as markerStart, giving
                double-headed arrows for bidirectional relationships. */}
            <marker
              id="arrowhead-start"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L8,3 L0,6 z" fill={COLORS.stroke} />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-sm text-neutral-500">{caption}</figcaption>
    </figure>
  );
}

type BoxTone = "default" | "accent" | "store" | "warn";

const TONES: Record<BoxTone, { fill: string; stroke: string }> = {
  default: { fill: COLORS.boxFill, stroke: COLORS.boxStroke },
  accent: { fill: COLORS.accentFill, stroke: COLORS.accentStroke },
  store: { fill: COLORS.storeFill, stroke: COLORS.storeStroke },
  warn: { fill: COLORS.warnFill, stroke: COLORS.warnStroke },
};

export function Box({
  x,
  y,
  w = 150,
  h = 56,
  label,
  sublabel,
  tone = "default",
  fill: fillOverride,
  stroke: strokeOverride,
  rx = 8,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sublabel?: string;
  tone?: BoxTone;
  /** Explicit colours, for diagrams with their own palette. */
  fill?: string;
  stroke?: string;
  /** Corner radius; pass h/2 for a stadium (start/end) shape. */
  rx?: number;
}) {
  const toned = TONES[tone];
  const fill = fillOverride ?? toned.fill;
  const stroke = strokeOverride ?? toned.stroke;
  const centerX = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <text
        x={centerX}
        y={sublabel ? y + h / 2 - 4 : y + h / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        fill={COLORS.text}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={centerX}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontSize={11}
          fill={COLORS.muted}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

/** Straight arrow with an optional label centered above it. */
export function Arrow({
  from,
  to,
  label,
  dashed = false,
  bidirectional = false,
  labelAt = 0.5,
}: {
  from: [number, number];
  to: [number, number];
  label?: string;
  dashed?: boolean;
  bidirectional?: boolean;
  /** Where along the line the label sits, 0 = start, 1 = end. Move it off 0.5
   *  when two nearby arrows would otherwise collide. */
  labelAt?: number;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const midX = x1 + (x2 - x1) * labelAt;
  const midY = y1 + (y2 - y1) * labelAt;

  // A label centered on the midpoint renders straight through the line. Push it
  // clear: vertical arrows get the label beside them; everything else gets it
  // offset perpendicular to the line, biased upward.
  const isVertical = Math.abs(x2 - x1) < 24;
  let labelX = midX;
  let labelY = midY - 7;
  if (isVertical) {
    labelX = midX + 8;
    labelY = midY + 3;
  } else {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    let px = -dy / length;
    let py = dx / length;
    if (py > 0) {
      px = -px;
      py = -py;
    }
    labelX = midX + px * 12;
    labelY = midY + py * 12;
  }

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={COLORS.stroke}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd="url(#arrowhead)"
        markerStart={bidirectional ? "url(#arrowhead-start)" : undefined}
      />
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor={isVertical ? "start" : "middle"}
          fontSize={11}
          fill={COLORS.muted}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Wide message-bus bar: bold title plus centered detail lines (e.g. topic names). */
export function Bus({
  x,
  y,
  w,
  h,
  title,
  lines,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines: string[];
}) {
  const centerX = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={COLORS.accentFill}
        stroke={COLORS.accentStroke}
        strokeWidth={2}
      />
      <text
        x={centerX}
        y={y + 25}
        textAnchor="middle"
        fontSize={15}
        fontWeight={700}
        letterSpacing={1}
        fill={COLORS.text}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={centerX}
          y={y + 45 + i * 15}
          textAnchor="middle"
          fontSize={11}
          fill={COLORS.muted}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Dashed panel listing supporting services that sit off the main data path. */
export function Panel({
  x,
  y,
  w,
  title,
  rows,
  nameColumnWidth = 100,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  rows: { name: string; desc: string }[];
  nameColumnWidth?: number;
}) {
  const rowHeight = 21;
  const height = 36 + rows.length * rowHeight;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={height}
        rx={8}
        fill="#ffffff"
        stroke={COLORS.boxStroke}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text
        x={x + 14}
        y={y + 21}
        fontSize={11}
        fontWeight={700}
        letterSpacing={0.5}
        fill={COLORS.muted}
      >
        {title}
      </text>
      {rows.map((row, i) => (
        <g key={row.name}>
          <text
            x={x + 14}
            y={y + 42 + i * rowHeight}
            fontSize={12}
            fontWeight={600}
            fill={COLORS.text}
          >
            {row.name}
          </text>
          <text
            x={x + 14 + nameColumnWidth}
            y={y + 42 + i * rowHeight}
            fontSize={11}
            fill={COLORS.muted}
          >
            {row.desc}
          </text>
        </g>
      ))}
    </g>
  );
}

/** Small multi-line annotation, for asides that don't belong in a box. */
export function NoteText({
  x,
  y,
  lines,
}: {
  x: number;
  y: number;
  lines: string[];
}) {
  return (
    <g>
      {lines.map((line, i) => (
        <text key={line} x={x} y={y + i * 14} fontSize={10} fill={COLORS.muted}>
          {line}
        </text>
      ))}
    </g>
  );
}

/** Dashed grouping outline with a small caption, for logical boundaries. */
export function GroupOutline({
  x,
  y,
  w,
  h,
  label,
  fill = "none",
  stroke = COLORS.boxStroke,
  dashed = true,
  labelColor = COLORS.muted,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Pass a colour for a filled panel instead of a bare outline. */
  fill?: string;
  stroke?: string;
  dashed?: boolean;
  labelColor?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={dashed ? 1 : 1.5}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <text
        x={x + 12}
        y={y + 18}
        fontSize={11}
        fontWeight={dashed ? 400 : 700}
        fill={labelColor}
      >
        {label}
      </text>
    </g>
  );
}

/** Decision node. `label` sits on one line, `sublabel` below it. */
export function Diamond({
  cx,
  cy,
  halfWidth = 110,
  halfHeight = 36,
  label,
  fill = COLORS.warnFill,
  stroke = COLORS.warnStroke,
}: {
  cx: number;
  cy: number;
  halfWidth?: number;
  halfHeight?: number;
  label: string;
  fill?: string;
  stroke?: string;
}) {
  return (
    <g>
      <polygon
        points={`${cx},${cy - halfHeight} ${cx + halfWidth},${cy} ${cx},${
          cy + halfHeight
        } ${cx - halfWidth},${cy}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={COLORS.text}
      >
        {label}
      </text>
    </g>
  );
}

/**
 * Right-angle arrow, for edges that bypass intermediate stages. "hv" goes
 * horizontal first then vertical; "vh" the reverse. Straight diagonals across a
 * dense diagram inevitably cut through boxes — these thread the gaps.
 */
export function ElbowArrow({
  from,
  to,
  axis = "hv",
  midY,
  label,
  dashed = false,
}: {
  from: [number, number];
  to: [number, number];
  /** "hv" horizontal-then-vertical, "vh" the reverse, "vhv" down-across-down
   *  (needs midY) for routing through a gap between two rows of boxes. */
  axis?: "hv" | "vh" | "vhv";
  /** The y of the horizontal run, for axis="vhv". */
  midY?: number;
  label?: string;
  dashed?: boolean;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;

  let points: string;
  let labelX: number;
  let labelY: number;
  let anchor: "middle" | "start";

  if (axis === "vhv") {
    const cross = midY ?? (y1 + y2) / 2;
    points = `${x1},${y1} ${x1},${cross} ${x2},${cross} ${x2},${y2}`;
    labelX = (x1 + x2) / 2;
    labelY = cross - 7;
    anchor = "middle";
  } else if (axis === "hv") {
    points = `${x1},${y1} ${x2},${y1} ${x2},${y2}`;
    labelX = (x1 + x2) / 2;
    labelY = y1 - 7;
    anchor = "middle";
  } else {
    points = `${x1},${y1} ${x1},${y2} ${x2},${y2}`;
    labelX = x1 + 8;
    labelY = (y1 + y2) / 2;
    anchor = "start";
  }

  return (
    <g>
      <polyline
        points={points}
        fill="none"
        stroke={COLORS.stroke}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor={anchor}
          fontSize={11}
          fill={COLORS.muted}
        >
          {label}
        </text>
      )}
    </g>
  );
}
