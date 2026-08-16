import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { extractApiError } from "@/lib/apiError";
import {
  clearSession,
  getAccessToken,
  getStoredUser,
  setSession,
  setStoredUser,
  type AuthUser,
} from "@/lib/session";
import { logOut, signIn as authSignIn, type AuthResponse } from "@/services/auth";
import { getMe, type UserProfile } from "@/services/userApi";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<UserProfile>;
  acceptSession: (email: string, res: AuthResponse) => AuthUser | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const storedToken = getAccessToken();
    if (!storedToken) {
      setLoading(false);
      return;
    }

    const storedUser = getStoredUser();
    if (storedUser) setUser(storedUser);
    setToken(storedToken);

    (async () => {
      try {
        const profile = await getMe();
        if (!active) return;
        const next: AuthUser = {
          id: profile.id,
          email: profile.email ?? storedUser?.email ?? null,
          emailVerified: true,
        };
        setUser(next);
        setStoredUser(next);
      } catch (err) {
        if (!active) return;
        const { status } = extractApiError(err);
        if (status === 401) {
          clearSession();
          setUser(null);
          setToken(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const acceptSession = useCallback((email: string, res: AuthResponse): AuthUser | null => {
    const session = res.session;
    const accessToken = session?.access_token;
    if (!accessToken || !res.user?.id) {
      return null;
    }
    const next: AuthUser = {
      id: res.user.id,
      email: res.user.email ?? email,
      emailVerified: Boolean(res.user.email_confirmed_at),
    };
    setSession(accessToken, session?.refresh_token);
    setStoredUser(next);
    setUser(next);
    setToken(accessToken);
    return next;
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    const res = await authSignIn(email, password);
    const user = acceptSession(email, res);
    if (!user) {
      throw new Error("Sign in failed — no session returned by the server.");
    }
    return user;
  }, [acceptSession]);

  const signOut = useCallback(async () => {
    try {
      await logOut();
    } catch {
      // Best effort — always clear the local session.
    }
    clearSession();
    setUser(null);
    setToken(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const profile = await getMe();
    setUser({
      id: profile.id,
      email: profile.email ?? user?.email ?? null,
      emailVerified: true,
    });
    return profile;
  }, [user?.email]);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, refreshUser, acceptSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
