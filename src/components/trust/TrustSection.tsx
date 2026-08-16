import { motion } from "framer-motion";
import { Clock, Languages, Sparkles, Zap } from "lucide-react";
import { Container } from "@/components/common/Container";
import { staggerContainer } from "@/lib/motion";

const ITEMS = [
  { icon: Sparkles, title: "AI-powered", note: "Agentic reasoning" },
  { icon: Zap, title: "Real-time", note: "Instant responses" },
  { icon: Languages, title: "Multilingual", note: "English · Hindi · Hinglish" },
  { icon: Clock, title: "Always available", note: "24/7, never sleeps" },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-surface/40 py-10 sm:py-12">
      <Container>
        <p className="mb-6 text-center text-xs font-medium tracking-[0.2em] text-muted uppercase">
          Built for conversations that matter
        </p>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4"
        >
          {ITEMS.map(({ icon: Icon, title, note }) => (
            <motion.li
              key={title}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center justify-center gap-3 text-center"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                <Icon className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-muted">{note}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
