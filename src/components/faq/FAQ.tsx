import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is an AI Voice Agent?",
    answer:
      "Unlike a conventional IVR or menu-based voice bot, an AI voice agent listens to natural speech, understands intent, reasons with context, and responds conversationally. It can also take actions — calling tools, retrieving memory or triggering workflows — rather than just playing back scripts.",
  },
  {
    question: "Can it speak Hindi?",
    answer:
      "Yes, as long as the configured speech recognition and voice (text-to-speech) providers support the required language. English, Hindi and Hinglish are first-class targets for the platform.",
  },
  {
    question: "Can it understand Hinglish?",
    answer:
      "The system is designed to handle mixed-language conversations. Hinglish — a blend of Hindi and English — is supported across speech recognition, the AI agent and voice output.",
  },
  {
    question: "Can I customize its personality?",
    answer:
      "Yes. You can configure the tone, style, personality and response behavior from your dashboard, so the assistant sounds the way your brand needs it to.",
  },
  {
    question: "Can it remember previous conversations?",
    answer:
      "Yes. Through the platform's memory architecture, the assistant can retain relevant context and user preferences across conversations.",
  },
  {
    question: "Can the agent call APIs?",
    answer:
      "Yes. Tools and agent workflows let the assistant interact with external services and APIs to complete tasks such as fetching information, booking appointments or triggering business processes.",
  },
  {
    question: "Can I connect my phone number?",
    answer:
      "Telephony integration is part of the platform roadmap. The supported providers and setup steps will be finalized alongside the backend implementation.",
  },
  {
    question: "Is my conversation data secure?",
    answer:
      "Security is built into the architecture: authenticated access, protected API calls, encrypted communication, user-controlled data and access-controlled resources. We only claim what we actually implement — and publish those details as they evolve.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered."
        description="Everything you need to know before getting started."
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.question}
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors duration-300",
                isOpen ? "border-accent/40 bg-card" : "border-border bg-card hover:border-border-strong"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-medium sm:text-base">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-accent"
                  )}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
