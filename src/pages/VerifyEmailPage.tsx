import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/auth/ErrorSummary";
import { FormField } from "@/components/auth/FormField";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/lib/apiError";
import { resendOtp, verifyOtp } from "@/services/auth";

export default function VerifyEmailPage() {
  const { acceptSession } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [formError, setFormError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const validate = (): ErrorSummaryItem[] => {
    const list: ErrorSummaryItem[] = [];
    if (!email.trim()) {
      list.push({ id: "email", message: "Enter your email address." });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      list.push({ id: "email", message: "Enter a valid email address." });
    }
    if (otp.length !== 6) {
      list.push({ id: "otp", message: "Enter the 6-digit verification code." });
    }
    return list;
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setInfo("");
    const list = validate();
    setErrors(list);
    if (list.length > 0) return;

    setSubmitting(true);
    try {
      const res = await verifyOtp(email.trim(), otp);
      const sessionUser = acceptSession(email.trim(), res);
      if (sessionUser) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true, state: { verified: true } });
      }
    } catch (err) {
      setFormError(extractApiError(err).message);
    } finally {
      setSubmitting(false);
    }
  };

  const onResend = async () => {
    if (cooldown > 0 || resending) return;
    setFormError("");
    setInfo("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrors((prev) => [
        ...prev.filter((e) => e.id !== "email"),
        { id: "email", message: "Enter a valid email address." },
      ]);
      return;
    }
    setResending(true);
    try {
      await resendOtp(email.trim());
      setInfo("A new verification code has been sent.");
      setCooldown(60);
    } catch (err) {
      setFormError(extractApiError(err).message);
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent to your inbox."
    >
      <form onSubmit={onVerify} noValidate>
        {errors.length > 0 && <ErrorSummary errors={errors} />}
        {formError && (
          <p role="alert" className="mb-4 rounded-xl border border-danger/40 bg-danger/10 p-3.5 text-sm text-danger">
            {formError}
          </p>
        )}
        {info && (
          <p role="status" className="mb-4 rounded-xl border border-success/40 bg-success/10 p-3.5 text-sm text-success">
            {info}
          </p>
        )}

        <div className="space-y-6">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            inputMode="email"
            error={errors.find((e) => e.id === "email")?.message}
          />

          <div>
            <p className="mb-1.5 text-sm font-medium">Verification code</p>
            <OTPInput
              id="otp"
              length={6}
              value={otp}
              onChange={setOtp}
              error={errors.find((e) => e.id === "otp")?.message}
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-7 w-full" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Verifying…" : "Verify"}
        </Button>

        <p className="mt-5 text-center text-sm text-muted">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={onResend}
            disabled={cooldown > 0 || resending}
            className="cursor-pointer font-medium text-accent hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? "Resending…" : "Resend code"}
          </button>
        </p>

        <p className="mt-4 text-center text-sm text-muted">
          <Link to="/login" className="hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
