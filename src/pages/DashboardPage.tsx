import { AudioWaveform, Clock, Globe2, LogOut, MailCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/common/Container";
import { PageLoader } from "@/components/common/PageLoader";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/lib/apiError";
import { getMe, type UserProfile } from "@/services/userApi";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getMe();
        if (active) setProfile(data);
      } catch (err) {
        if (!active) return;
        const { status, message } = extractApiError(err);
        if (status === 403) {
          setError("verify");
        } else {
          setError(message);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const onLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="AI Voice Assistant home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-glow shadow-glow">
              <AudioWaveform className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              AI Voice<span className="text-muted"> Assistant</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" to="/">
              Home
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-muted">
              Welcome back, {user?.email ?? "friend"}. Your assistant workspace is taking shape.
            </p>

            {loading ? (
              <PageLoader label="Loading your profile…" />
            ) : error === "verify" ? (
              <div className="mt-8 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-6">
                <div className="flex items-center gap-3">
                  <MailCheck className="h-6 w-6 text-amber-400" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Verify your email to continue</h2>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Your account is active but your email isn't verified yet. Verify it to unlock the
                  full platform.
                </p>
                <div className="mt-5">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/verify-email?email=${encodeURIComponent(user?.email ?? "")}`)
                    }
                  >
                    Verify email
                  </Button>
                </div>
              </div>
            ) : error ? (
              <div className="mt-8 rounded-2xl border border-danger/40 bg-danger/10 p-6 text-sm text-danger">
                {error}
              </div>
            ) : profile ? (
              <div className="mt-8 space-y-6">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
                  <h2 className="text-sm font-medium tracking-widest text-muted uppercase">
                    Profile
                  </h2>
                  <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
                        <UserRound className="h-5 w-5 text-accent" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-muted">Name</dt>
                        <dd className="text-sm font-medium">
                          {profile.full_name || "—"}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
                        <UserRound className="h-5 w-5 text-accent" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-muted">Email</dt>
                        <dd className="truncate text-sm font-medium">{profile.email}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
                        <Globe2 className="h-5 w-5 text-accent" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-muted">Preferred language</dt>
                        <dd className="text-sm font-medium">
                          {profile.preferred_language || "en"}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
                        <Clock className="h-5 w-5 text-accent" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-muted">Timezone</dt>
                        <dd className="text-sm font-medium">{profile.timezone || "UTC"}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="rounded-3xl border border-dashed border-border-strong bg-surface/40 p-8 text-center">
                  <h2 className="text-lg font-semibold">More is coming</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                    Calls, conversations, assistant configuration and settings arrive in the next
                    phases. Authentication is live — the workspace is on its way.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </main>
    </div>
  );
}
