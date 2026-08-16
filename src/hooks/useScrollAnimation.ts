import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation<T extends HTMLElement>(options?: { once?: boolean }) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, {
    once: options?.once ?? true,
    margin: "-10% 0px -10% 0px",
  });
  return { ref, inView };
}
