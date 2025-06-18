import React from 'react';
import { useGetItemsQuery } from '../services/aiInsightsApi';
import { aiInsightsType } from '../types/aiInsightsType';
import { useUserStore } from '../store/progressSlice';
import { useGetProgressStatsQuery } from '../../../shared/api/api';

const AIInsightsList: React.FC = () => {
  const { data: insights = [] } = useGetItemsQuery();

  const userId = useUserStore((state) => state.userId);
  
  const { isLoading, isError } = useGetProgressStatsQuery(userId!, {
    skip: !userId, // אם אין userId דלג על הקריאה
  });

  if (!userId) return <p> משתמש לא מובר. </p>;
  if (isLoading) return <p>טוען... אנא המתן...</p>;
  if (isError) return <p>מצטערים, אירעה שגיאה בשליפה.</p>;
  if (insights.length === 0) return <p> לא נמצאו מסקנות. </p>;

  return (
    <div>
      <h2>המסקנות שלך למעשה:</h2>
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <ul style={{ listStyle: 'inside', margin: 0, padding: 0 }}>
          {insights.map((insight: aiInsightsType) => (
            <li key={insight.id} style={{ marginBottom: '10px' }}>
              {insight.summary}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIInsightsList;

