// // import { pool } from '../config/dbConnection';
// // import { checkDate } from '../utils/reminderUtils'

// // async function getDueReminders() {
// //   const query = `
// //     SELECT 
// //     r.*, 
// //   u.id AS user_id,
// //   s.frequency
// //   FROM 
// //   tips r
// //   CROSS JOIN users u
// // JOIN user_reminder_settings s ON u.id = s.user_id
// //   `;

// //   const { rows } = await pool.query(query);
// //   await checkDate(rows);


// //   return rows.map((row) => ({
// //     id: row.id,
// //     user_id: row.user_id,
// //     content: row.content,
// //     last_sent_at: row.last_sent_at,
// //     user: {
// //       user_reminder_settings: {
// //         frequency: row.frequency
// //       }
// //     }
// //   }));
// // }

// // export default {
// //   getDueReminders,
// // };

import { pool } from '../config/dbConnection';

// async function getDueReminders() {
//   const query = `
//     SELECT 
//       r.id,
//       r.content,
//       s.last_sent_at,
//       s.frequency,
//       u.id as user_id
//     FROM tips r
//     CROSS JOIN users u
//     JOIN user_reminder_settings s ON s.user_id = u.id
//   `;

//   const { rows } = await pool.query(query);

//   // // סינון לפי התדירות והתאריך האחרון
//   // const dueRows = rows.filter(row =>
//   //   isReminderDue(row.last_sent_at, row.frequency)
//   // );

//   // return dueRows.map((row) => ({
//   return rows.map((row) => ({
//     id: row.id,
//     user_id: row.user_id,
//     content: row.content,
//     last_sent_at: row.last_sent_at,
//     user: {
//       user_reminder_settings: {
//         frequency: row.frequency
//       }
//     }
//   }));
// }

// export default {
//   getDueReminders,
// };


// src/reposioty/reminderRepository.ts
async function getDueReminders() {
  const query = `
    SELECT 
      t.id AS tip_id,
      t.content,
      s.user_id,
      s.frequency,
      s.last_sent_at
    FROM tips t
    JOIN user_reminder_settings s ON s.tip_id = t.id
  `;

  const { rows } = await pool.query(query);

  return rows.map((row) => ({
    tip_id: row.tip_id,
    content: row.content,
    user_id: row.user_id,
    last_sent_at: row.last_sent_at,
    user: {
      user_reminder_settings: {
        frequency: row.frequency,
      },
    },
  }));
}
export default {
  getDueReminders,
};