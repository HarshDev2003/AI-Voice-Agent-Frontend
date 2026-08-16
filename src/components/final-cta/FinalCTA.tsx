import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { fadeUp } from "@/lib/motion";
import { scrollToId } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section id="get-started" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-card sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-glow" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-glow-cyan opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-b" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Your AI assistant is{" "}
              <span className="text-gradient">ready to work.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Build an assistant that can listen, understand and act — then let it take the
              calls that matter.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Button variant="primary" size="lg" to="/register">
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToId("features")}
              >
                Explore the platform
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
