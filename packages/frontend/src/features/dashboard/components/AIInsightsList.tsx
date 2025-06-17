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

// export default AIInsightsList;

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

