// text-base keeps inputs at 16px so iOS Safari doesn't zoom in on focus.
export const inputClass =
  "w-full rounded-md border border-ink/15 bg-white/60 px-3 py-2.5 text-base outline-none placeholder:text-ink/30 focus:border-sage-600";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[15px] font-normal text-ink">{label}</p>
      {children}
    </div>
  );
}
