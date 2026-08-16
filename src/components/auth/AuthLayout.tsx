import { AudioWaveform, Check, Languages, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const PERKS = [
  { icon: PhoneCall, text: "Handles your calls, 24/7" },
  { icon: Check, text: "Natural, human-like conversations" },
  { icon: Languages, text: "English · Hindi · Hinglish" },
];

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r border-border bg-surface/40 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-glow" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />

          <Link to="/" className="relative flex items-center gap-2.5" aria-label="AI Voice Assistant home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-glow shadow-glow">
              <AudioWaveform className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              AI Voice
              <span className="text-muted"> Assistant</span>
            </span>
          </Link>

          <div className="relative max-w-md">
            <h2 className="text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
              Handle calls with an AI assistant that{" "}
              <span className="text-gradient">sounds like you.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-muted">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-sm text-muted">© 2026 AI Voice Assistant</p>
        </div>

        <div className="relative flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-glow lg:hidden" />

          <div className="relative w-full max-w-md">
            <Link
              to="/"
              className="mb-8 flex items-center gap-2.5 lg:hidden"
              aria-label="AI Voice Assistant home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-glow shadow-glow">
                <AudioWaveform className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                AI Voice
                <span className="text-muted"> Assistant</span>
              </span>
            </Link>

            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span aria-hidden="true">←</span> Back to home
            </Link>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted">{subtitle}</p>
              <div className="mt-7">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
