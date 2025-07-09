// רק בסיעתא דשמיא //

// // import React from "react";
// // import { skipToken } from '@reduxjs/toolkit/query/react';
// // import { useGetRemindersQuery } from "../services/remindersApi";

// // export default function ReminderComponent() {
// //   const { data: reminders, isLoading, error } = useGetRemindersQuery("");

// //   if (isLoading) return <p>טוען טיפים...</p>;
// //   if (error) return <p>שגיאה בטעינת טיפים</p>;
// //   if (!reminders || reminders.length === 0) return <p>אין טיפים זמינים</p>;

// //   return (
// //     <div>
// //       <h2 className="text-xl font-bold mb-4">טיפים שלך:</h2>
// //       <ul className="space-y-2">
// //         {reminders.map((r) => (
// //           <li key={r.id} className="border p-2 rounded bg-white shadow">
// //             <p>{r.content}</p>
// //             <p className="text-sm text-gray-500">תדירות: {r.user.user_reminder_settings.tip_frequency}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// import React from "react";
// import { useGetRemindersQuery } from "../services/remindersApi";

// export default function ReminderComponent() {
//   const { data: reminders, isLoading, error } = useGetRemindersQuery("");

//   if (isLoading) return <p>טוען תזכורת...</p>;
//   if (error) return <p>שגיאה בטעינה</p>;
//   if (!reminders || reminders.length === 0) return <p>אין תזכורות להצגה כרגע</p>;

//   const reminder = reminders[0]; // מציג רק את התזכורת היומית

//   return (
//     <div className="border p-4 rounded bg-white shadow mt-6">
//       <h2 className="text-xl font-bold mb-2">טיפ יומי 🎯</h2>
//       <p className="text-lg">{reminder.content}</p>
//       <p className="text-sm text-gray-500 mt-2">תדירות: {reminder.frequency}</p>
//     </div>
//   );
// }
// +++ //
// import React from 'react';
// import { useGetSentTipsQuery } from '../services/remindersApi';

// export default function ReminderComponent() {
//   const { data: tips, isLoading, error } = useGetSentTipsQuery();

//   if (isLoading) return <p>טוען טיפים שנשלחו...</p>;
//   if (error) return <p>שגיאה בטעינת הטיפים</p>;
//   if (!tips || tips.length === 0) return <p>אין טיפים להצגה</p>;

//   return (
//     <div>
//       <h2>טיפים שנשלחו עד היום</h2>
//       <ul>
//         {tips.map(tip => (
//           <li key={tip.tip_id}>{tip.content}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// +++ //

import React, { useEffect } from "react";
import { useGetRemindersQuery } from "../services/remindersApi";

export default function ReminderComponent() {
  const { data: reminders, isLoading, error } = useGetRemindersQuery();

  useEffect(() => {
    if (error) {
      console.error("שגיאה בקריאת API:", error);
    }
  }, [error]);

  if (isLoading) return <p>טוען תזכורות...</p>;
  if (error) return <p>שגיאה בטעינה</p>;
  if (!reminders || reminders.length === 0) return <p>אין טיפים להצגה כרגע</p>;

  return (
    <div className="border p-4 rounded bg-white shadow mt-6">
      <h2 className="text-xl font-bold mb-2">טיפים</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={`${reminder.tip_id}-${reminder.tip_num}`}>{reminder.content}</li>
          // <li key={`${reminder.tip_id}-${reminder.tip_num}`}>{reminder.content}</li>
          // <li key={reminder.tip_id}>{reminder.content}</li>
        ))}
      </ul>
    </div>
  );
}
