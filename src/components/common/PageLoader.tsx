import { Loader2 } from "lucide-react";

export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3" role="status">
      <Loader2 className="h-8 w-8 animate-spin text-accent" aria-hidden="true" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
