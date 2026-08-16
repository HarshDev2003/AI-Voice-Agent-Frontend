import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/common/Section";
import { fadeLeft, fadeRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LANGUAGES = ["English", "Hindi", "Hinglish"];
const STYLES = ["Direct", "Friendly", "Professional"];

export function PersonalizationSection() {
  const [personality, setPersonality] = useState(65);
  const [tone, setTone] = useState(40);
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState("Professional");

  return (
    <Section id="personalization">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted">
            <SlidersHorizontal className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Personalization
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Make it sound <span className="text-gradient">like you.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Configure the assistant's personality, tone and language so every call feels on-brand —
            from professional and concise to casual and warm.
          </p>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="space-y-7">
            <div>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium">Personality</span>
                <span className="text-xs text-muted">
                  {personality < 40 ? "Professional" : personality < 75 ? "Balanced" : "Casual"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={personality}
                onChange={(e) => setPersonality(Number(e.target.value))}
                className="range"
                style={{ "--p": `${personality}%` } as React.CSSProperties}
                aria-label="Personality"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium">Tone</span>
                <span className="text-xs text-muted">
                  {tone < 40 ? "Concise" : tone < 75 ? "Balanced" : "Detailed"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={tone}
                onChange={(e) => setTone(Number(e.target.value))}
                className="range"
                style={{ "--p": `${tone}%` } as React.CSSProperties}
                aria-label="Tone"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Language</p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Language">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    role="radio"
                    aria-checked={language === lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                      language === lang
                        ? "border-accent bg-accent/15 text-foreground"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Response Style</p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Response style">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={style === s}
                    onClick={() => setStyle(s)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                      style === s
                        ? "border-accent bg-accent/15 text-foreground"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
