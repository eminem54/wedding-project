// text-base keeps inputs at 16px so iOS Safari doesn't zoom in on focus.
export const inputClass =
  "w-full rounded-lg border border-ink/10 px-3 py-2.5 text-base outline-none placeholder:text-ink/30 focus:border-blossom-400";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-base text-ink">{label}</p>
      {children}
    </div>
  );
}
