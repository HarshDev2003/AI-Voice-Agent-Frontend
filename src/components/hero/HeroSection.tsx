import { motion } from "framer-motion";
import { Check, Languages, PhoneIncoming } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { VoiceVisualizer } from "@/components/hero/VoiceVisualizer";
import { fadeRight, fadeUp, staggerContainer } from "@/lib/motion";
import { scrollToId } from "@/lib/utils";

const TICKS = ["Natural Conversations", "English • Hindi • Hinglish", "Available 24/7"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-60" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium tracking-widest text-muted uppercase backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
                AI Voice Agent
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              Your AI Assistant That{" "}
              <span className="text-gradient">Actually Talks Like You.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              Handle calls, conversations and tasks with an intelligent AI voice agent that
              listens, understands and acts in real time.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button variant="primary" size="lg" to="/register">
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToId("how-it-works")}
              >
                See How It Works
              </Button>
            </motion.div>

            <motion.ul variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {TICKS.map((tick) => (
                <li key={tick} className="flex items-center gap-2 text-sm text-muted">
                  <Check className="h-4 w-4 text-glow" aria-hidden="true" />
                  {tick}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <VoiceVisualizer state="idle" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -top-4 -left-2 hidden items-center gap-2 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-card backdrop-blur sm:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                <PhoneIncoming className="h-4 w-4 text-accent" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium">Call answered</p>
                <p className="text-[11px] text-muted">Missed calls, gone</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -bottom-4 -right-2 hidden items-center gap-2 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-card backdrop-blur sm:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-glow/15">
                <Languages className="h-4 w-4 text-glow" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium">English · Hindi · Hinglish</p>
                <p className="text-[11px] text-muted">Understands every caller</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
