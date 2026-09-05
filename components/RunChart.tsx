import { stages } from "@/lib/run";

// One SVG, five bands. Band width is proportional to wall-clock hours with a
// floor so the short post-training stages stay legible. Loss stages share a
// 0 to 10 axis; DPO accuracy and GRPO reward use 0 to 1 on the same height.
const W = 1200;
const H = 380;
const TOP = 44;
const BOTTOM = 56;
const PLOT = H - TOP - BOTTOM;

const isLoss = (name: string) => ["Pretrain", "Midtrain", "SFT"].includes(name);

export default function RunChart() {
  const weights = stages.map((s) => Math.max(s.hours, 1.6));
  const total = weights.reduce((a, b) => a + b, 0);
  const bands = stages.map((s, i) => ({
    s,
    x: (weights.slice(0, i).reduce((a, b) => a + b, 0) / total) * W,
    w: (weights[i] / total) * W,
  }));

  const y = (name: string, v: number) =>
    TOP + PLOT - (isLoss(name) ? v / 10 : v) * PLOT;

  const lrMax = 6e-4;

  return (
    <figure>
      <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Training metrics across five stages: loss for pretrain, midtrain and SFT; preference accuracy for DPO; verified reward for GRPO."
        className="w-full min-w-[52rem]"
      >
        {bands.map(({ s, x, w }, i) => {
          const last = s.points[s.points.length - 1];
          const end = last[0];
          const px = (t: number) => x + (t / end) * (w - 2);
          const path = s.points
            .map(([t, v], k) => `${k ? "L" : "M"}${px(t).toFixed(1)},${y(s.name, v).toFixed(1)}`)
            .join(" ");
          const lr = s.points.some((p) => p[2] != null && p[2] > 1e-4)
            ? s.points
                .map(([t, , l], k) => `${k ? "L" : "M"}${px(t).toFixed(1)},${(TOP + PLOT - ((l ?? 0) / lrMax) * PLOT * 0.5).toFixed(1)}`)
                .join(" ")
            : null;
          return (
            <g key={s.name}>
              <rect
                x={x}
                y={TOP}
                width={w}
                height={PLOT}
                fill={i % 2 ? "#ffffff" : "#eceef2"}
              />
              {lr && (
                <path d={lr} fill="none" stroke="#d5202f" strokeWidth={1.5} strokeDasharray="4 4" />
              )}
              <path d={path} fill="none" stroke="#0e1217" strokeWidth={2} strokeLinejoin="round" />
              <text x={x + 10} y={TOP - 16} fontSize={20} fontWeight={700} fill="#0e1217">
                {s.name}
              </text>
              <text x={x + 10} y={H - 30} fontSize={14} fill="#5b6470">
                {s.hours} h
              </text>
              <text x={x + 10} y={H - 10} fontSize={14} fill="#5b6470">
                {s.metric}
              </text>
              <text x={x + w - 10} y={TOP + 20} fontSize={14} textAnchor="end" fill="#0e1217">
                {last[1].toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
      </div>
      <figcaption className="mt-3 text-sm text-carbon-soft">
        Unedited step logs from the first full-scale run, downsampled. Loss
        stages read on a 0 to 10 axis; DPO and GRPO read on 0 to 1. The dashed
        red line is the learning rate, peak 6e-4.
      </figcaption>
    </figure>
  );
}
