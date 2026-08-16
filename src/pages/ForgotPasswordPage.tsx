import { Loader2, MailCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/auth/ErrorSummary";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/common/Button";
import { extractApiError } from "@/lib/apiError";
import { forgotPassword } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): ErrorSummaryItem[] => {
    const list: ErrorSummaryItem[] = [];
    if (!email.trim()) {
      list.push({ id: "email", message: "Enter your email address." });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      list.push({ id: "email", message: "Enter a valid email address." });
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
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setFormError(extractApiError(err).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send you a reset link."
    >
      {sent ? (
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/15">
            <MailCheck className="h-7 w-7 text-success" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted">
            We've sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>. The link expires
            shortly, so check your spam folder if you don't see it.
          </p>
          <div className="mt-7 space-y-2.5">
            <Button variant="secondary" size="lg" className="w-full" onClick={() => setSent(false)}>
              Use a different email
            </Button>
            <Button variant="ghost" size="lg" className="w-full" to="/login">
              Back to login
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          {errors.length > 0 && <ErrorSummary errors={errors} />}
          {formError && (
            <p role="alert" className="mb-4 rounded-xl border border-danger/40 bg-danger/10 p-3.5 text-sm text-danger">
              {formError}
            </p>
          )}

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

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {submitting ? "Sending…" : "Send reset link"}
          </Button>

          <p className="mt-5 text-center text-sm text-muted">
            Remembered it?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Back to login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
