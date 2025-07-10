<<<<<<< HEAD
import React, { useEffect } from "react";
import { BarChart2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { useGetProgressStatsQuery } from "../../../shared/api/progressStatsApi";

const ProgressStats: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // קריאה ל־API - רק אם יש משתמש
  const { data, isLoading, isError } = useGetProgressStatsQuery(user?.id ?? "", {
    skip: !user,
  });

  useEffect(() => {
    if (data) {
      // כאן אפשר להפעיל פעולות מבוססות על הנתונים
    }
  }, [data]);

  if (!user) return <p>אנא התחבר</p>;
=======
// import React from 'react';
// import { useProgressStats } from '../hooks/useProgressStats';

// const ProgressStats: React.FC = () => {
//   const { data, isLoading, isError } = useProgressStats("f3810ab0-1757-49ed-9459-5784f3d47aba");

//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (isError) return <p>שגיאה בטעינת נתונים</p>;

//   const total = data?.totalQuestions || 0;
//   const answered = data?.answeredQuestions || 0;

//   // מערך של קוביות - לפי מספר השאלות
//   const boxes = Array.from({ length: total }, (_, index) => (
//     <div
//       key={index}
//       style={{
//         width: '20px',
//         height: '20px',
//         margin: '5px',
//         backgroundColor: index < answered ? '#4caf50' : '#e0e0e0', // ירוק אם ענינו, אפור אם לא
//         borderRadius: '4px',
//         transition: 'background-color 0.3s'
//       }}
//     />
//   ));

//   return (
//     <div style={{ direction: 'rtl', textAlign: 'right' }}>
//       <h2>סטטיסטיקת התקדמות</h2>
//       <div style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '4px',
//         maxWidth: '300px',
//         // border: '1px solid #ccc',
//         padding: '10px',
//         borderRadius: '8px'
//       }}>
//         {boxes}
//       </div>
//     </div>
//   );
// };

// export default ProgressStats;


import React from 'react';
import { useUserStore } from '../store/progressSlice';
import { useGetProgressStatsQuery } from '../../../shared/api/api';

const ProgressStats: React.FC = () => {
  // שולף userId רק מהסטור
const userId = useUserStore((state) => state.userId);

const { data, isLoading, isError } = useGetProgressStatsQuery(userId!, {
  skip: !userId, // אם אין userId דלג על הקריאה
});


  if (!userId) return <p>אנא התחבר</p>;
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה בטעינת נתונים</p>;

  const total = data?.totalQuestions ?? 0;
  const answered = data?.answeredQuestions ?? 0;
<<<<<<< HEAD
  const percentage = total ? (answered / total) * 100 : 0;

  return (
    <section className="relative mx-auto max-w-md text-center p-6 bg-gradient-to-tr from-[--color-primary]/10 via-white to-[--color-primary]/20 rounded-3xl shadow-md">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[--color-text]">
          <BarChart2 size={24} />
          <h2 className="text-xl font-bold">התקדמות כללית</h2>
        </div>

        <div className="font-semibold text-[--color-text]">
          {answered} / {total} שאלות הושלמו
        </div>

        <div className="w-full h-4 bg-[--color-border] rounded-full overflow-hidden">
          <div
            className="h-full bg-[--color-primary] transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="text-sm text-[--color-secondary-text]">
          הושלמו {percentage.toFixed(1)}% מתוך כלל השאלות
        </div>
      </div>
    </section>
=======

  return (
    <div style={{ direction: 'rtl', textAlign: 'right' }}>
      <h2>סטטיסטיקת התקדמות</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: '300px',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: i < answered ? '#4caf50' : '#e0e0e0',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
  );
};

export default ProgressStats;
