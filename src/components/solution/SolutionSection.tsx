import { motion } from "framer-motion";
import { Bot, Ear, Microchip, MessageSquare, Waypoints } from "lucide-react";
import { Section } from "@/components/common/Section";
import { fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";

const CAPABILITIES = [
  { icon: Ear, label: "Listen" },
  { icon: Microchip, label: "Understand" },
  { icon: MessageSquare, label: "Respond" },
  { icon: Waypoints, label: "Act" },
];

const FLOW = [
  { label: "Caller", detail: "Speaks naturally" },
  { label: "Voice In", detail: "Audio captured" },
  { label: "Speech Recognition", detail: "Audio → text" },
  { label: "AI Agent", detail: "Reasoning · memory · tools" },
  { label: "Action", detail: "Tools & workflows" },
  { label: "Response", detail: "Text → natural reply" },
  { label: "Voice Out", detail: "Text → speech" },
  { label: "Caller", detail: "Conversation continues" },
];

export function SolutionSection() {
  return (
    <Section className="bg-surface/40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted">
            <Bot className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            The solution
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Meet your <span className="text-gradient">AI Voice Agent.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            A conversational AI agent that can listen, understand, respond and take action in
            real time — not a scripted menu.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {CAPABILITIES.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" />
            <div className="relative flex flex-col gap-2">
              {FLOW.map((node, i) => (
                <motion.div
                  key={node.label}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    className={`w-40 shrink-0 rounded-xl border px-3.5 py-2.5 text-sm font-medium ${
                      node.label === "AI Agent"
                        ? "border-accent/50 bg-accent/15 text-foreground"
                        : "border-border bg-surface text-foreground"
                    }`}
                  >
                    {node.label}
                  </motion.span>
                  <span className="hidden min-w-0 flex-1 truncate text-xs text-muted sm:block">
                    {node.detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
