// // // import { pool } from '../config/dbConnection';

// // // async function getDueReminders() {
// // //   const query = `
// // //     SELECT 
// // //       t.id AS tip_id,
// // //       t.content,
// // //       s.user_id,
// // //       s.frequency,
// // //       s.last_sent_at
// // //     FROM tips t
// // //     JOIN user_reminder_settings s ON s.tip_id = t.id
// // //   `;

// // //   const { rows } = await pool.query(query);

// // //   return rows.map((row) => ({
// // //     tip_id: row.tip_id,
// // //     content: row.content,
// // //     user_id: row.user_id,
// // //     last_sent_at: row.last_sent_at,
// // //     user: {
// // //       user_reminder_settings: {
// // //         tip_frequency: row.frequency,
// // //       },
// // //     },
// // //   }));
// // // }
// // // export default {
// // //   getDueReminders,
// // // };

/*
// 🔧 reminderRepository.ts
import { pool } from '../config/dbConnection';

async function getDueReminders() {
  const { rows } = await pool.query(`
    SELECT 
      s.user_id,
      s.tip_num,
      s.frequency,
      s.last_sent_at,
      t.id AS tip_id,
      t.content
    FROM user_reminder_settings s
    JOIN tips t ON t.id = s.tip_num
    WHERE s.is_enabled = true AND s.type = 'tip'
  `);

  return rows.map((row) => ({
    user_id: row.user_id,
    tip_id: row.tip_id,
    content: row.content,
    last_sent_at: row.last_sent_at,
    frequency: row.frequency,
    tip_num: row.tip_num,
  }));
}

export default { getDueReminders };
*/
// // // 🔧 reminderRepository.ts
// // import { pool } from '../config/dbConnection';

// // async function getDueReminders() {
// //   const { rows } = await pool.query(`
// //     WITH numbered_tips AS (
// //       SELECT 
// //         id,
// //         content,
// //         ROW_NUMBER() OVER (ORDER BY id) AS row_num
// //       FROM tips
// //     )
// //     SELECT 
// //       s.user_id,
// //       s.tip_num,
// //       s.frequency,
// //       s.last_sent_at,
// //       t.id AS tip_id,
// //       t.content
// //     FROM user_reminder_settings s
// //     JOIN numbered_tips t ON t.row_num = s.tip_num
// //     WHERE s.is_enabled = true AND s.type = 'tip'
// //   `);

// //   return rows.map((row) => ({
// //     user_id: row.user_id,
// //     tip_id: row.tip_id,
// //     content: row.content,
// //     last_sent_at: row.last_sent_at,
// //     frequency: row.frequency,
// //     tip_num: row.tip_num,
// //   }));
// // }

// // export default { getDueReminders };
// // 🔧 reminderRepository.ts
// import { pool } from '../config/dbConnection';

// async function getDueReminders() {
//   const { rows } = await pool.query(`
//     WITH numbered_tips AS (
//       SELECT id, content, ROW_NUMBER() OVER (ORDER BY id) AS number FROM tips
//     )
//     SELECT 
//       s.user_id,
//       s.tip_num,
//       s.frequency,
//       s.last_sent_at,
//       t.id AS tip_id,
//       t.content,
//       t.number
//     FROM user_reminder_settings s
//     JOIN numbered_tips t ON t.number = s.tip_num
//     WHERE s.is_enabled = true AND s.type = 'tip'
//   `);

//   return rows.map((row) => ({
//     user_id: row.user_id,
//     tip_id: row.tip_id,
//     content: row.content,
//     last_sent_at: row.last_sent_at,
//     frequency: row.frequency,
//     tip_num: row.tip_num,
//     number: row.number,
//   }));
// }

// export default { getDueReminders };
import { pool } from '../config/dbConnection';

async function getAllSentTips() {
  const { rows } = await pool.query(`
    SELECT t.id, t.content, MIN(st.sent_at) AS first_sent_at
    FROM sent_tips st
    JOIN tips t ON t.id = st.tip_id
    GROUP BY t.id, t.content
    ORDER BY first_sent_at
  `);
  return rows;
}

export default {
  getAllSentTips,
};
