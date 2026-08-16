export interface PasswordRule {
  label: string;
  met: boolean;
}

export interface PasswordAnalysis {
  rules: PasswordRule[];
  score: number;
  label: string;
}

export function analyzePassword(password: string): PasswordAnalysis {
  const rules: PasswordRule[] = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "An uppercase letter", met: /[A-Z]/.test(password) },
    { label: "A lowercase letter", met: /[a-z]/.test(password) },
    { label: "A number", met: /\d/.test(password) },
  ];
  const score = rules.filter((rule) => rule.met).length;
  const label = score < 2 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong";
  return { rules, score, label };
}
