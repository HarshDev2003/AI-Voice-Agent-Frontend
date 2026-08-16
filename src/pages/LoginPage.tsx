import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/auth/ErrorSummary";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/lib/apiError";

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";
  const verifiedBanner = (location.state as { verified?: boolean } | null)?.verified;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!password) {
      list.push({ id: "password", message: "Enter your password." });
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
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      const { message } = extractApiError(err);
      if (/confirm|verif/i.test(message)) {
        navigate(`/verify-email?email=${encodeURIComponent(email.trim())}`, { replace: true });
        return;
      }
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to manage your AI voice assistant.">
      <form onSubmit={onSubmit} noValidate>
        {verifiedBanner && (
          <p role="status" className="mb-4 rounded-xl border border-success/40 bg-success/10 p-3.5 text-sm text-success">
            Your email is verified. You can now log in.
          </p>
        )}
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
          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            error={errors.find((e) => e.id === "password")?.message}
          />
        </div>

        <div className="mt-4 text-right">
          <Link to="/forgot-password" className="text-sm text-muted transition-colors hover:text-foreground">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Logging in…" : "Log in"}
        </Button>

        <p className="mt-5 text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-accent hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
