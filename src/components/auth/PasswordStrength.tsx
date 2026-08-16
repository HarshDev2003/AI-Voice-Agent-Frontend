import { analyzePassword } from "@/lib/password";
import { cn } from "@/lib/utils";

export function PasswordStrength({ password }: { password: string }) {
  const { rules, score, label } = analyzePassword(password);

  if (!password) return null;

  const segmentColor = score >= 4 ? "bg-success" : score === 3 ? "bg-glow" : score === 2 ? "bg-amber-400" : "bg-danger";

  return (
    <div className="mt-2" role="status">
      <div className="flex gap-1" aria-hidden="true">
        {rules.map((_, i) => (
          <span
            key={i}
            className={cn("h-1 flex-1 rounded-full transition-colors duration-300", i < score ? segmentColor : "bg-border")}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-muted">
        Strength: <span className="text-foreground">{label}</span>
        {score < 4 && (
          <span>
            {" · Need "}
            {rules
              .filter((rule) => !rule.met)
              .map((rule) => rule.label.toLowerCase())
              .join(", ")}
            .
          </span>
        )}
      </p>
    </div>
  );
}
