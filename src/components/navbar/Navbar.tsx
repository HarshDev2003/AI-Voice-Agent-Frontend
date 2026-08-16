import { AnimatePresence, motion } from "framer-motion";
import { AudioWaveform, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { cn, scrollToId } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Features", target: "features" },
  { label: "How It Works", target: "how-it-works" },
  { label: "Use Cases", target: "use-cases" },
  { label: "Pricing", target: "get-started" },
  { label: "FAQ", target: "faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (target: string) => {
    setOpen(false);
    scrollToId(target);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[72px]">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="AI Voice Assistant home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-glow shadow-glow">
            <AudioWaveform className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            AI Voice
            <span className="text-muted"> Assistant</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item.target)}
              className="cursor-pointer rounded-lg px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" to="/login">
            Login
          </Button>
          <Button variant="primary" size="sm" to="/register">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-foreground hover:bg-white/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goTo(item.target)}
                  className="cursor-pointer rounded-lg px-3 py-3 text-left text-[15px] text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-3 flex flex-col gap-2.5 border-t border-border pt-4">
                <Button variant="secondary" size="lg" to="/login">
                  Login
                </Button>
                <Button variant="primary" size="lg" to="/register">
                  Get Started
                </Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
