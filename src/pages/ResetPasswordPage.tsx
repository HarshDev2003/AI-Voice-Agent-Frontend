import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/auth/ErrorSummary";
import { FormField } from "@/components/auth/FormField";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/common/Button";
import { extractApiError } from "@/lib/apiError";
import { analyzePassword } from "@/lib/password";
import { resetPassword } from "@/services/auth";

function getRecoveryToken(): string {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    const hashToken = new URLSearchParams(hash).get("access_token");
    if (hashToken) return hashToken;
  }
  return new URLSearchParams(window.location.search).get("access_token") ?? "";
}

export default function ResetPasswordPage() {
  const [recoveryToken] = useState(getRecoveryToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): ErrorSummaryItem[] => {
    const list: ErrorSummaryItem[] = [];
    const unmet = analyzePassword(password).rules.filter((rule) => !rule.met);
    if (unmet.length > 0) {
      list.push({
        id: "password",
        message: `Password needs: ${unmet.map((rule) => rule.label.toLowerCase()).join(", ")}.`,
      });
    }
    if (!confirm) {
      list.push({ id: "confirm", message: "Confirm your new password." });
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
      await resetPassword(password, recoveryToken);
      setDone(true);
    } catch (err) {
      setFormError(extractApiError(err).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!recoveryToken) {
    return (
      <AuthLayout title="Reset password" subtitle="The link you followed is invalid.">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/15">
            <ShieldCheck className="h-7 w-7 text-danger" aria-hidden="true" />
          </span>
          <p className="mt-5 text-sm text-muted">
            This reset link is missing or has expired. Request a new one to continue.
          </p>
          <div className="mt-7 space-y-2.5">
            <Button size="lg" className="w-full" to="/forgot-password">
              Request a new link
            </Button>
            <Button variant="ghost" size="lg" className="w-full" to="/login">
              Back to login
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (done) {
    return (
      <AuthLayout title="Reset password" subtitle="Your password has been updated.">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/15">
            <ShieldCheck className="h-7 w-7 text-success" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">Password updated</h2>
          <p className="mt-2 text-sm text-muted">
            You can now log in with your new password.
          </p>
          <Button size="lg" className="mt-7 w-full" to="/login">
            Go to login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset password" subtitle="Choose a new password for your account.">
      <form onSubmit={onSubmit} noValidate>
        {errors.length > 0 && <ErrorSummary errors={errors} />}
        {formError && (
          <p role="alert" className="mb-4 rounded-xl border border-danger/40 bg-danger/10 p-3.5 text-sm text-danger">
            {formError}
          </p>
        )}

        <div className="space-y-5">
          <div>
            <FormField
              id="password"
              label="New password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              error={errors.find((e) => e.id === "password")?.message}
              autoFocus
            />
            <PasswordStrength password={password} />
          </div>
          <FormField
            id="confirm"
            label="Confirm new password"
            type="password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            error={errors.find((e) => e.id === "confirm")?.message}
          />
        </div>

        <Button type="submit" size="lg" className="mt-7 w-full" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Updating…" : "Update password"}
        </Button>

        <p className="mt-5 text-center text-sm text-muted">
          <Link to="/login" className="hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
