import { api } from "@/services/api";

export interface UserProfile {
  id: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  preferred_language?: string | null;
  timezone?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface UserProfileUpdate {
  full_name?: string;
  avatar_url?: string;
  preferred_language?: string;
  timezone?: string;
}

export async function getMe(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/api/users/me");
  return data;
}

export async function updateMe(payload: UserProfileUpdate): Promise<UserProfile> {
  const { data } = await api.patch<UserProfile>("/api/users/me", payload);
  return data;
}
