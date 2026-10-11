import { stages } from "@/lib/run";

// One small chart per stage. Each has its own scale, labelled with the
// stage's lowest and highest logged values, because loss, preference accuracy
// and reward are different quantities and lower is better only for loss.
// Panels are equal width: a stage, not a length of time.
const W = 220;
const H = 120;

const notes: Record<string, string> = {
  Pretrain: "loss, lower is better",
  Midtrain: "loss, lower is better",
  SFT: "loss, lower is better",
  DPO: "preference accuracy",
  GRPO: "reward; a well-formed wrong answer scores 0.2",
};

const fmt = (v: number) => v.toFixed(2);

export default function RunChart() {
  return (
    <figure>
      <ol className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((s) => {
          const vals = s.points.map((p) => p[1]);
          const lo = Math.min(...vals);
          const hi = Math.max(...vals);
          const end = s.points[s.points.length - 1][0];
          const x = (t: number) => (t / end) * W;
          const y = (v: number) => 6 + (1 - (v - lo) / (hi - lo)) * (H - 12);
          const d = s.points.map(([t, v], k) => `${k ? "L" : "M"}${x(t).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
          const first = vals[0];
          const last = vals[vals.length - 1];
          return (
            <li key={s.name}>
              <p className="flex items-baseline justify-between gap-2">
                <span className="font-medium">{s.name}</span>
                <span className="text-sm tabular-nums text-ink-soft">{s.hours} h</span>
              </p>
              <p className="mt-0.5 min-h-10 text-xs leading-5 text-ink-soft">{notes[s.name]}</p>
              <div className="mt-2 grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2">
                <div className="flex flex-col justify-between py-0.5 text-right text-[0.7rem] tabular-nums text-ink-soft">
                  <span>{fmt(hi)}</span>
                  <span>{fmt(lo)}</span>
                </div>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  preserveAspectRatio="none"
                  role="img"
                  aria-label={`${s.name}, ${s.metric}: ${fmt(first)} at the start, ${fmt(last)} at the end of ${s.hours} hours.`}
                  className="h-28 w-full rounded-lg bg-bench"
                >
                  <path
                    d={d}
                    fill="none"
                    stroke="#1b1035"
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm tabular-nums">
                <span className="text-ink-soft">{fmt(first)} to </span>
                <span className="font-medium">{fmt(last)}</span>
              </p>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-6 text-sm leading-6 text-ink-soft">
        Step logs from the run, downsampled. Loss is cross-entropy.
      </figcaption>
    </figure>
  );
}
