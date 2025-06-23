// import React from 'react';
// import { useGetItemsQuery } from '../services/aiInsightsApi';
// import { aiInsightsType } from '../types/aiInsightsType';
// import { useUserStore } from '../store/progressSlice';
// import { useGetProgressStatsQuery } from '../../../shared/api/api';

// const AIInsightsList: React.FC = () => {
//   const { data: insights = [] } = useGetItemsQuery();

// const userId = useUserStore((state) => state.userId) || 'user2';
  
//   const { isLoading, isError } = useGetProgressStatsQuery(userId!, {
//     skip: !userId, // אם אין userId דלג על הקריאה
//   });

//   if (!userId) return <p> משתמש לא מחובר. </p>;
//   if (isLoading) return <p>טוען... אנא המתן...</p>;
//   if (isError) return <p>מצטערים, אירעה שגיאה בשליפה.</p>;
//   if (insights.length === 0) return <p> לא נמצאו מסקנות. </p>;

//   return (
//     <div>
//       <h2>המסקנות שלך למעשה:</h2>
//       <div
//         style={{
//           maxHeight: '300px',
//           overflowY: 'auto',
//           border: '1px solid #ccc',
//           padding: '10px',
//           borderRadius: '8px',
//           backgroundColor: '#f9f9f9',
//         }}
//       >
//         <ul style={{ listStyle: 'inside', margin: 0, padding: 0 }}>
//           {insights.map((insight: aiInsightsType) => (
//             <li key={insight.id} style={{ marginBottom: '10px' }}>
//               {insight.summary}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AIInsightsList;

import React from 'react';
import { useGetItemsQuery } from '../services/aiInsightsApi';
import { aiInsightsType } from '../types/aiInsightsType';
import { useUserStore } from '../store/progressSlice';
import { useGetProgressStatsQuery } from '../../../shared/api/api';
import { CheckCircle } from 'lucide-react';

const AIInsightsList: React.FC = () => {
  const { data: insights = [] } = useGetItemsQuery();
  const userId = useUserStore(state => state.userId) || '11111111-1111-1111-1111-111111111111';

  const { isLoading, isError } = useGetProgressStatsQuery(userId, { skip: !userId });

  if (isLoading) return <p className="text-center text-blue-500 text-lg">טוען... אנא המתן...</p>;
  if (isError) return <p className="text-center text-red-500 text-lg">אירעה שגיאה בשליפה.</p>;
  if (insights.length === 0) return <p className="text-center text-gray-600">לא נמצאו מסקנות.</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto flex flex-col gap-4" dir="rtl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <CheckCircle className="text-emerald-500 w-5 h-5" />
        <h2 className="text-lg font-semibold text-primary-text">מסקנות AI</h2>
      </div>

      <ul className="list-disc list-inside text-gray-800 text-sm space-y-2">
        {insights.map((insight: aiInsightsType) => (
          <li key={insight.id} className="leading-relaxed">{insight.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsightsList;
