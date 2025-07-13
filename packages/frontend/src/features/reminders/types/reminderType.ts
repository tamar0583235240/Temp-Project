

// shared/types/reminders.ts

export type ReminderType = "practice" | "tip";

export type ReminderFrequency =
  | "daily"
  | "every-two-days"
  | "every-three-days"
  | "weekly";
// לבדוק אם לשנות
  // export interface reminderType {
// export interface UserReminderSetting {
export interface reminderType {
  id: string;
  user_id: string;
  type: ReminderType;
  frequency: ReminderFrequency;
  is_enabled: boolean;
  created_at: string;
}
