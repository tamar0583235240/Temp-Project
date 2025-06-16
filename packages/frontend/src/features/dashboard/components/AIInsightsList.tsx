// import React from 'react';

// const AIInsightsList: React.FC = () => {
//   return (
//     <div>
//       <h2> :המסקנות שלך למעשה </h2>
//         <ul>
//             <li></li>
//         </ul>
//     </div>
//   );
// };

// export default AIInsightsList;

import React, { useEffect, useState } from 'react';
import { AIInsight } from '../../../../../backend/src/interfaces/AIInsight';

const AIInsightsList: React.FC = () => {
    const [insights, setInsights] = useState<AIInsight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/insights')
            .then(res => res.json())
            .then(data => {
                setInsights(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('שגיאה בשליפת תובנות:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>טוען תובנות...</p>;

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <h2>המסקנות שלך למעשה:</h2>
            <ul>
                {insights.map(insight => (
                    <li key={insight.id}>
                        {insight.summary} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AIInsightsList;

