// Values drawn as bars, to scale from zero. Each bar sits in a fixed track and
// its value in a fixed column, so a longer label never shortens a bar.
// `muted` rows are the comparison; the rest are drawn in violet.
export type Row = { label: string; value: number; shown: React.ReactNode; muted?: boolean; strong?: boolean };

export function BarRows({
  rows,
  max,
  labelWidth = "7rem",
  valueWidth = "5.5rem",
}: {
  rows: Row[];
  max: number;
  labelWidth?: string;
  valueWidth?: string;
}) {
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li
          key={r.label}
          className="grid items-center gap-3 text-sm"
          style={{ gridTemplateColumns: `${labelWidth} minmax(0,1fr) ${valueWidth}` }}
        >
          <span className={r.strong ? "font-medium" : "text-ink-soft"}>{r.label}</span>
          <span className="block h-2.5">
            <span
              className={`block h-full rounded-full ${r.muted ? "bg-mist" : "bg-violet"}`}
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </span>
          <span className={`tabular-nums ${r.muted ? "text-ink-soft" : "font-medium"}`}>{r.shown}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Bars({
  rows,
  max,
  labelWidth,
  caption,
}: {
  rows: Row[];
  max?: number;
  labelWidth?: string;
  caption: React.ReactNode;
}) {
  return (
    <figure>
      <BarRows rows={rows} max={max ?? Math.max(...rows.map((r) => r.value))} labelWidth={labelWidth} />
      <figcaption className="mt-4 text-sm leading-6 text-ink-soft">{caption}</figcaption>
    </figure>
  );
}
