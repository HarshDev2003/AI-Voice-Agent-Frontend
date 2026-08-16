import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Headphones,
  Settings2,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const CASES = [
  {
    icon: UserRound,
    title: "Personal Assistant",
    items: ["Handle calls", "Answer common questions", "Manage reminders"],
  },
  {
    icon: Headphones,
    title: "Customer Support",
    items: ["Answer customer queries", "Handle repetitive requests", "Escalate complex issues"],
  },
  {
    icon: TrendingUp,
    title: "Sales",
    items: ["Qualify leads", "Answer product questions", "Schedule calls"],
  },
  {
    icon: Settings2,
    title: "Business Operations",
    items: ["Automate repetitive calls", "Trigger workflows", "Connect APIs"],
  },
  {
    icon: CalendarDays,
    title: "Appointment Management",
    items: ["Book appointments", "Confirm appointments", "Reschedule appointments"],
  },
  {
    icon: Building2,
    title: "Receptionist",
    items: ["Answer incoming calls", "Route conversations", "Capture information"],
  },
];

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHeading
        eyebrow="Use cases"
        title="One assistant. Many jobs."
        description="Wherever there's a phone call, your AI agent can handle it — consistently, at scale."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CASES.map(({ icon: Icon, title, items }) => (
          <motion.article
            key={title}
            variants={fadeUp}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-accent/70 shadow-glow">
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-medium">{title}</h3>
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glow" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
