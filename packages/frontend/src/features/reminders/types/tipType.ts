// export default interface tip {
//     id: string;
//     content: string;
//     user: {
//         user_reminder_settings: {
//             tip_frequency: string;
//         };
//     }
// }

export default interface Tip {
  tip_id: string;
  content: string;
  user_id: string;
  frequency: string;
  last_sent_at: string | null;
  tip_num: number;
}
