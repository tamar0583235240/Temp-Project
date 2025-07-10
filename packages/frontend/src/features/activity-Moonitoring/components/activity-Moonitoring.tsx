// import React, { useEffect, useState } from 'react';

// type PopularQuestion = {
//   id: string;
//   question: string;
//   popularity: number;
// };

// const PopularQuestions: React.FC = () => {
//   const [questions, setQuestions] = useState<PopularQuestion[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // useEffect(() => {
//   //   const fetchPopularQuestions = async () => {
//   //     try {
//   //       const response = await fetch('/api/questions/popular?limit=10');
//   //       if (!response.ok) throw new Error('שגיאה בטעינת שאלות');
//   //       const data: PopularQuestion[] = await response.json();
//   //       setQuestions(data);
//   //     } catch (err) {
//   //       setError('נכשל בטעינת שאלות פופולריות');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchPopularQuestions();
//   // }, []);
//   useEffect(() => {
//     const fetchPopularQuestions = async () => {
//       try {
//         console.log('טוען שאלות...');
//         const response = await fetch('/api/questions/popular?limit=10');
//         if (!response.ok) throw new Error('שגיאה בטעינת שאלות');
//         const data: PopularQuestion[] = await response.json();
//         console.log('שאלות שהתקבלו:', data);
//         setQuestions(data);
//       } catch (err) {
//         console.error('שגיאה:', err);
//         setError('נכשל בטעינת שאלות פופולריות');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchPopularQuestions();
//   }, []);
  
//   if (loading) return <p>טוען שאלות פופולריות...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-4 rounded shadow bg-white">
//       <h2 className="text-xl font-bold mb-4">שאלות פופולריות</h2>
//       <ul className="space-y-2 list-decimal rtl text-right">
//         {questions.map((q) => (
//           <li key={q.id} className="text-gray-800">
//             <span className="font-medium">{q.question}</span>
//             <span className="text-sm text-gray-500 ml-2">(פופולריות: {q.popularity})</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PopularQuestions;
import React, { useEffect, useState } from 'react';

interface PopularQuestion {
  id: string;
  question: string;
  popularity: number;
}

const PopularQuestions = () => {
  const [questions, setQuestions] = useState<PopularQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/questions/popular?limit=${limit}&offset=${offset}`);
      const data: PopularQuestion[] = await response.json();

      if (data.length < limit) {
        setHasMore(false);
      }

      setQuestions(prev => [...prev, ...data]);
      setOffset(prev => prev + limit);
    } catch (error) {
      console.error('שגיאה בטעינת שאלות פופולריות:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(); // טעינה ראשונית
  }, []);

  return (
    <div style={{ padding: '2rem', direction: 'rtl' }}>
      <h2>שאלות פופולריות</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {questions.map(q => (
          <li key={q.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
            <strong>{q.question}</strong><br />
            <span style={{ color: '#777' }}>פופולריות: {q.popularity}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={fetchQuestions}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading ? 'טוען...' : 'טען עוד שאלות'}
        </button>
      )}

      {!hasMore && (
        <p style={{ color: 'gray', marginTop: '1rem' }}>לא נמצאו שאלות נוספות</p>
      )}
    </div>
  );
};

export default PopularQuestions;
