import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/auth/ErrorSummary";
import { FormField } from "@/components/auth/FormField";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/lib/apiError";
import { analyzePassword } from "@/lib/password";
import { signUp } from "@/services/auth";

export default function RegisterPage() {
  const { user, loading, acceptSession } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = (): ErrorSummaryItem[] => {
    const list: ErrorSummaryItem[] = [];
    if (!email.trim()) {
      list.push({ id: "email", message: "Enter your email address." });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      list.push({ id: "email", message: "Enter a valid email address." });
    }

    const unmet = analyzePassword(password).rules.filter((rule) => !rule.met);
    if (unmet.length > 0) {
      list.push({
        id: "password",
        message: `Password needs: ${unmet.map((rule) => rule.label.toLowerCase()).join(", ")}.`,
      });
    }

    if (!confirm) {
      list.push({ id: "confirm", message: "Confirm your password." });
    } else if (confirm !== password) {
      list.push({ id: "confirm", message: "Passwords do not match." });
    }

    return list;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const list = validate();
    setErrors(list);
    if (list.length > 0) return;

    setSubmitting(true);
    try {
      const res = await signUp(email.trim(), password);
      const sessionUser = acceptSession(email.trim(), res);
      if (sessionUser) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate(`/verify-email?email=${encodeURIComponent(email.trim())}`, { replace: true });
      }
    } catch (err) {
      setFormError(extractApiError(err).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Set up your AI voice assistant in under a minute.">
      <form onSubmit={onSubmit} noValidate>
        {errors.length > 0 && <ErrorSummary errors={errors} />}
        {formError && (
          <p role="alert" className="mb-4 rounded-xl border border-danger/40 bg-danger/10 p-3.5 text-sm text-danger">
            {formError}
          </p>
        )}

        <div className="space-y-5">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            error={errors.find((e) => e.id === "email")?.message}
            autoFocus
          />
          <div>
            <FormField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              hint={password ? undefined : "Use at least 8 characters with upper, lower and a number."}
              error={errors.find((e) => e.id === "password")?.message}
            />
            <PasswordStrength password={password} />
          </div>
          <FormField
            id="confirm"
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            error={errors.find((e) => e.id === "confirm")?.message}
          />
        </div>

        <Button type="submit" size="lg" className="mt-7 w-full" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Creating account…" : "Create account"}
        </Button>

        <p className="mt-5 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
