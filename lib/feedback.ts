export const FEEDBACK_TYPES = [
  "Bug report",
  "Feature request",
  "General feedback",
] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export const MAX_FEEDBACK_MESSAGE_LENGTH = 500;
