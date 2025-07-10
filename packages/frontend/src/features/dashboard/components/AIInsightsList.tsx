<<<<<<< HEAD
import { FileText } from "lucide-react";
import { useGetAiInsightsQuery } from '../services/aiInsightsApi';
import { CardWrapper } from "./CardWrapper";

const AIInsightsList: React.FC = () => {
  const { data: insights = [], isLoading, isError } = useGetAiInsightsQuery();

  if (isLoading) return <p>טוען מסקנות...</p>;
  if (isError) return <p>אירעה שגיאה בשליפה.</p>;
  if (insights.length === 0) return <p>לא נמצאו מסקנות.</p>;

  return (
    <CardWrapper
      title="מסקנות מה-AI"
      icon={<FileText size={24} />}
      className="border-l-4 border-[--color-primary] bg-[--color-background]"
    >
      <div
        className="overflow-y-auto pr-2 scrollbar-none"
        style={{ maxHeight: "13rem" }}
      >
        <ul className="list-inside space-y-3 text-[--color-text] text-base">
          {insights.map((insight) => (
            <li key={insight.id} className="flex items-center gap-3 text-[--color-text] bg-white p-2 rounded-lg">
              <span>{insight.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};

export default AIInsightsList;
=======
// import React from 'react';
// import { useGetItemsQuery } from '../services/aiInsightsApi'; 
// import { aiInsightsType } from '../types/aiInsightsType';

// const AIInsightsList: React.FC = () => {
//   const { data: insights = [], isLoading, isError } = useGetItemsQuery();

//   if (isLoading) return <p>טוען... אנא המתן...</p>;
//   if (isError) return <p> מצטערים, אירעה שגיאה בשליפה. </p>;

//   return (
//     <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
//       <h2>המסקנות שלך למעשה:</h2>
//       <ul>
//         {insights.map((insight: aiInsightsType) => (
//           <li key={insight.id}>
//             {insight.summary}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import React from 'react';
import { useGetItemsQuery } from '../services/aiInsightsApi';
import { aiInsightsType } from '../types/aiInsightsType';

const AIInsightsList: React.FC = () => {
  const { data: insights = [], isLoading, isError } = useGetItemsQuery();

  if (isLoading) return <p>טוען... אנא המתן...</p>;
  if (isError) return <p>מצטערים, אירעה שגיאה בשליפה.</p>;

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

>>>>>>> b9cae16 (AI Insights)
