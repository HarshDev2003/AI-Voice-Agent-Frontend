import { api } from "@/services/api";

interface SupabaseUser {
  id?: string;
  email?: string | null;
  email_confirmed_at?: string | null;
  created_at?: string | null;
}

interface SupabaseSession {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: SupabaseUser;
}

export interface AuthResponse {
  user?: SupabaseUser | null;
  session?: SupabaseSession | null;
}

function normalize(response: unknown): AuthResponse {
  const data = response as {
    user?: SupabaseUser | null;
    session?: SupabaseSession | null;
    data?: { user?: SupabaseUser | null; session?: SupabaseSession | null };
  };
  return {
    user: data?.user ?? data?.data?.user ?? null,
    session: data?.session ?? data?.data?.session ?? null,
  };
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post("/api/auth/signup", { email, password });
  return normalize(data);
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post("/api/auth/login", { email, password });
  return normalize(data);
}

export async function verifyOtp(email: string, token: string): Promise<AuthResponse> {
  const { data } = await api.post("/api/auth/verify-otp", { email, token });
  return normalize(data);
}

export async function resendOtp(email: string): Promise<void> {
  await api.post("/api/auth/resend-otp", { email });
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post("/api/auth/forgot-password", { email });
}

export async function resetPassword(newPassword: string, recoveryToken: string): Promise<void> {
  await api.post(
    "/api/auth/reset-password",
    { new_password: newPassword },
    { headers: { Authorization: `Bearer ${recoveryToken}` } }
  );
}

export async function logOut(): Promise<void> {
  await api.post("/api/auth/logout");
}
