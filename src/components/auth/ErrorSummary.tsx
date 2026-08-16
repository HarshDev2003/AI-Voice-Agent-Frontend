import { useEffect, useRef } from "react";

export interface ErrorSummaryItem {
  id: string;
  message: string;
}

export function ErrorSummary({ errors }: { errors: ErrorSummaryItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const lastKey = useRef("");

  const key = errors.map((e) => `${e.id}:${e.message}`).join("|");

  useEffect(() => {
    if (errors.length > 0 && key !== lastKey.current) {
      lastKey.current = key;
      ref.current?.focus();
    }
  }, [key, errors.length]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="rounded-xl border border-danger/40 bg-danger/10 p-4 focus:outline-none"
    >
      <h2 className="text-sm font-semibold text-danger">There is a problem</h2>
      <ul className="mt-2 space-y-1">
        {errors.map((error) => (
          <li key={error.id}>
            <a
              href={`#${error.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(error.id)?.focus();
              }}
              className="text-sm text-danger underline underline-offset-2 hover:brightness-125"
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
