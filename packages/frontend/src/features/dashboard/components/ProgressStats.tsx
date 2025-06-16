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
  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה בטעינת נתונים</p>;

  const total = data?.totalQuestions ?? 0;
  const answered = data?.answeredQuestions ?? 0;

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
  );
};

export default ProgressStats;
