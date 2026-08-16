import { motion } from "framer-motion";
import { KeyRound, Lock, ShieldCheck, UserCheck, EyeOff, Fingerprint } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const SECURITY = [
  { icon: KeyRound, title: "Authentication", detail: "Secure access to your account and assistants." },
  { icon: Fingerprint, title: "Protected API access", detail: "Every request is authorized and scoped." },
  { icon: Lock, title: "Encrypted communication", detail: "Conversations travel over encrypted channels." },
  { icon: UserCheck, title: "User-controlled data", detail: "You decide what's stored and for how long." },
  { icon: EyeOff, title: "Conversation privacy", detail: "Sensitive calls stay private by default." },
  { icon: ShieldCheck, title: "Access-controlled resources", detail: "Assistants and data are isolated per user." },
];

export function SecuritySection() {
  return (
    <Section id="security">
      <SectionHeading
        eyebrow="Security"
        title="Secure by design."
        description="Conversations can contain personal information, so privacy and access control are built into the architecture — not bolted on."
      />

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SECURITY.map(({ icon: Icon, title, detail }) => (
          <motion.li
            key={title}
            variants={fadeUp}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
              <Icon className="h-5 w-5 text-glow" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted">{detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
