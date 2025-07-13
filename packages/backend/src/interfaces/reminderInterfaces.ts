


// // shared/types/reminders.ts

// export type ReminderType = "practice" | "tip";

// export type ReminderFrequency =
//   | "daily"
//   | "every-two-days"
//   | "every-three-days"
//   | "weekly";
// // לבדוק אם לשנות
//   // export interface reminderType {
// // export interface UserReminderSetting {
// export interface ReminderInterface {
//   id: string;
//   user_id: string;
//   type: ReminderType;
//   frequency: ReminderFrequency;
//   is_enabled: boolean;
//   created_at: string;
// }

// ✅ 1. Reminder types (shared/types/reminders.ts)

export type ReminderType = "practice" | "tip";

export type ReminderFrequency =
  | "daily"
  | "every_2_days"
  | "every_3_days"
  | "weekly";

export type ReminderSelection = {
  is_enabled: boolean;
  frequency: ReminderFrequency | null;
};

export interface UserReminderSetting {
  id: string;
  user_id: string;
  type: ReminderType;
  frequency: ReminderFrequency;
  is_enabled: boolean;
  created_at: string;
}