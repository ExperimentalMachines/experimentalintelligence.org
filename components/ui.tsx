// Small pieces the page's sections share.

export const link = "text-ink underline decoration-rule underline-offset-4 hover:decoration-ink";

export const h2 = "display text-4xl font-normal leading-[1.05] tracking-[-0.03em] sm:text-5xl";

export const lede = "text-lg leading-8 text-ink-soft";

export const card = "rounded-[1.75rem] p-6 sm:p-8";

// A project's name and its status. `pending` marks work with no result yet.
export function ProjectLabel({ name, status, pending }: { name: string; status: string; pending?: boolean }) {
  return (
    <p className="flex flex-wrap items-center gap-3 text-base">
      <span className="font-medium">{name}</span>
      <span
        className={`rounded-full border px-2.5 py-0.5 text-xs text-ink-soft ${
          pending ? "border-dashed border-ink/30" : "border-rule"
        }`}
      >
        {status}
      </span>
    </p>
  );
}
