import { AudioWaveform } from "lucide-react";
import { Container } from "@/components/common/Container";
import { scrollToId } from "@/lib/utils";

const COLUMNS: Array<{ title: string; links: Array<{ label: string; target?: string }> }> = [
  {
    title: "Product",
    links: [
      { label: "Features", target: "features" },
      { label: "How It Works", target: "how-it-works" },
      { label: "Use Cases", target: "use-cases" },
      { label: "Pricing", target: "get-started" },
      { label: "FAQ", target: "faq" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About" }, { label: "Contact" }, { label: "Careers" }],
  },
  {
    title: "Resources",
    links: [{ label: "Documentation" }, { label: "API" }, { label: "Blog" }],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy" }, { label: "Terms" }],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-glow">
                <AudioWaveform className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                AI Voice
                <span className="text-muted"> Assistant</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Your intelligent AI-powered voice assistant. Listens, understands, remembers and
              acts.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-medium">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.target ? (
                      <button
                        onClick={() => link.target && scrollToId(link.target)}
                        className="cursor-pointer text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span className="text-sm text-muted">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>© 2026 AI Voice Assistant</p>
          <p>English · Hindi · Hinglish</p>
        </div>
      </Container>
    </footer>
  );
}
