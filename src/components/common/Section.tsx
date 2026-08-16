import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-32", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
