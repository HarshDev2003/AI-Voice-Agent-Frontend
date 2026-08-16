export type VoiceState = "idle" | "listening" | "thinking" | "speaking";

export const voiceStateLabels: Record<VoiceState, string> = {
  idle: "Ready",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
};
