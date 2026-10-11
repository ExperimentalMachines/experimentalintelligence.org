import { losses } from "@/lib/opengrad";

// Base against the same model after supervised fine-tuning, on three real
// benchmarks. Paired bars on one axis anchored at zero: the claim is the size
// of the gap, so a truncated axis would be doing the arguing. The refusal rate
// beside each row is what separates a capability loss from a refusal policy.
const MAX = 80;

export default function CapabilityChart() {
  return (
    <figure>
      <ul className="space-y-7">
        {losses.map((l) => (
          <li key={l.name} className="grid gap-3 sm:grid-cols-[11rem_1fr_7rem] sm:items-center sm:gap-6">
            <div className="flex items-baseline justify-between gap-4 sm:block">
              <p className="font-medium">{l.name}</p>
              <p className="text-sm text-ink-soft">refuses {l.refusal}</p>
            </div>
            <div className="space-y-1.5">
              {[
                { v: l.from, cls: "bg-mist", text: "text-ink-soft", who: "Base" },
                { v: l.to, cls: "bg-violet", text: "font-medium", who: "After SFT" },
              ].map((b) => (
                <div key={b.who} className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3 text-sm">
                  <span className="block h-3">
                    <span className={`block h-full rounded-full ${b.cls}`} style={{ width: `${(b.v / MAX) * 100}%` }} />
                  </span>
                  <span className={`tabular-nums ${b.text}`}>
                    {b.v.toFixed(1)}%<span className="sr-only"> {b.who}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="display whitespace-nowrap text-2xl tabular-nums sm:text-right">
              {l.delta.toFixed(1).replace("-", "\u2212")}
              <span className="text-base text-ink-soft"> pts</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-2.5 w-6 rounded-full bg-mist" /> Base Qwen3.5-2B
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-2.5 w-6 rounded-full bg-violet" /> After our tool-use SFT
        </span>
      </div>
    </figure>
  );
}
