// The numbered marker that opens every section. It is the page's spine: the
// same three parts (index, rule, label) at the same size in the same place,
// so the reader learns one rhythm and then stops noticing it. Used on both
// surfaces, so it takes a tone rather than guessing from its parent.
export default function SectionMarker({
  n,
  label,
  tone = "light",
}: {
  n: string;
  label: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-ink-soft" : "text-carbon-soft";
  const rule = tone === "dark" ? "bg-ink-rule" : "bg-rule";

  return (
    <p className={`eyebrow flex items-center gap-3 ${muted}`}>
      <span className="text-signal">{n}</span>
      <span className={`h-px w-10 ${rule}`} aria-hidden="true" />
      {label}
    </p>
  );
}
