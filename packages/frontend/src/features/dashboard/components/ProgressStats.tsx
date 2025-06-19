
import React from 'react';
import {useGetProgressStatsQuery} from '../../../shared/api/api';
import { useUserStore } from '../store/progressSlice';

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