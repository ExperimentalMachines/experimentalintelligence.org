import { losses } from "@/lib/opengrad";

// Base against the same model after supervised fine-tuning, on three real
// benchmarks. Grouped horizontal bars: two series, fixed order, both direct-
// labelled. One axis, anchored at zero — the whole claim is the size of the
// gap, so a truncated axis would be doing the arguing.
//
// The refusal column is the load-bearing part. On GSM8K 8-shot and MMLU-Pro
// the model refuses essentially nothing, so those gaps cannot be explained
// away as a refusal policy. IFEval is shown with its 19% refusal rate stated
// rather than hidden, because there the two effects are genuinely mixed.
const W = 1200;
const ROW = 108;
const TOP = 34;
const H = TOP + losses.length * ROW + 26;
const LABEL = 268;
const RIGHT = 132;
const AXIS_MAX = 80;
const TRACK = W - LABEL - RIGHT;

const x = (v: number) => LABEL + (v / AXIS_MAX) * TRACK;

export default function CapabilityChart() {
  return (
    <figure>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={
            "Base Qwen3.5-2B against the same model after supervised fine-tuning. " +
            losses
              .map((l) => `${l.name}: ${l.from}% falls to ${l.to}%, ${l.delta} points`)
              .join(". ") +
            "."
          }
          className="w-full min-w-[46rem]"
        >
          {[0, 20, 40, 60, 80].map((t) => (
            <g key={t}>
              <line
                x1={x(t)}
                y1={TOP - 10}
                x2={x(t)}
                y2={H - 26}
                stroke="#d8dce3"
                strokeWidth={1}
              />
              <text x={x(t)} y={H - 8} fontSize={14} textAnchor="middle" fill="#5b6470">
                {t}%
              </text>
            </g>
          ))}

          {losses.map((l, i) => {
            const top = TOP + i * ROW;
            return (
              <g key={l.name}>
                <text x={0} y={top + 26} fontSize={19} fontWeight={700} fill="#0e1217">
                  {l.name}
                </text>
                <text x={0} y={top + 50} fontSize={14} fill="#5b6470">
                  refuses {l.refusal} here
                </text>

                <rect x={LABEL} y={top + 8} width={x(l.from) - LABEL} height={26} fill="#0e1217" />
                <text
                  x={x(l.from) + 10}
                  y={top + 27}
                  fontSize={15}
                  fill="#0e1217"
                  className="tabular-nums"
                >
                  {l.from.toFixed(1)}%
                </text>

                <rect x={LABEL} y={top + 40} width={x(l.to) - LABEL} height={26} fill="#d5202f" />
                <text
                  x={x(l.to) + 10}
                  y={top + 59}
                  fontSize={15}
                  fill="#d5202f"
                  className="tabular-nums"
                >
                  {l.to.toFixed(1)}%
                </text>

                <text
                  x={W - 8}
                  y={top + 44}
                  fontSize={22}
                  fontWeight={700}
                  textAnchor="end"
                  fill="#a8151f"
                  className="tabular-nums"
                >
                  {l.delta.toFixed(1)}pp
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-6 bg-carbon" aria-hidden="true" />
          Base Qwen3.5-2B
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-6 bg-signal" aria-hidden="true" />
          After our supervised fine-tuning
        </span>
      </div>

      <figcaption className="mt-3 max-w-3xl text-sm leading-6 text-carbon-soft">
        Real upstream benchmarks at pinned revisions, scored by upstream
        checkers. Every stage ran on one engine configuration, so no gap here is
        attributable to the runtime. On the bottom two rows the model refuses
        essentially nothing, which is what makes them capability results rather
        than a restatement of the refusal behaviour.
      </figcaption>
    </figure>
  );
}
