export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-[26px] font-light tracking-wide text-sage-600">{children}</h2>
  );
}

// Filled olive button used for the main call-to-action in each section.
export const primaryButtonClass =
  "rounded-md bg-sage-600 px-10 py-3.5 text-[15px] font-normal text-white shadow-md transition-colors hover:bg-sage-700 disabled:opacity-40";

export const outlineButtonClass =
  "rounded-md border border-sage-600 bg-transparent px-6 py-3 text-sm font-normal text-sage-700 transition-colors hover:bg-sage-50";
