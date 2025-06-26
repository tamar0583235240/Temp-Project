// // import { Reminder } from "../interfaces/reminderInterfaces";

// // export function isReminderDue(reminder: Reminder): boolean {
// //   const now = new Date();
// //   const last = new Date(reminder.last_sent_at || 0);
// //   const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

// //   switch (reminder.frequency) {
// //     case 'Every day': return diffDays >= 1;
// //     case 'Every other day': return diffDays >= 2;
// //     case 'Once every 3 days': return diffDays >= 3;
// //     case 'Once a week': return diffDays >= 7;
// //     default: return false;
// //   }
// // }
// export function isReminderDue(reminder: { last_sent_at: string | null }, frequency: string): boolean {
//   const now = new Date();
//   const last = new Date(reminder.last_sent_at || 0);
//   const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

//   switch (frequency) {
//     case 'Every day': return diffDays >= 1;
//     case 'Every other day': return diffDays >= 2;
//     case 'Once every 3 days': return diffDays >= 3;
//     case 'Once a week': return diffDays >= 7;
//     default: return false;
//   }
// }
export function isReminderDue(lastSentAt: string | null, frequency: string): boolean {
  const now = new Date();
  const last = new Date(lastSentAt || 0);
  const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

  switch (frequency) {
    case 'daily': return diffDays >= 1;
    case 'every_2_days': return diffDays >= 2;
    case 'every_3_days': return diffDays >= 3;
    case 'weekly': return diffDays >= 7;
    default: return false;
  }
}
