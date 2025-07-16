// import React, { useEffect, useState } from 'react';

// interface PopularQuestion {
//   id: string;
//   question: string;
//   popularity: number;
// }

// const PopularQuestions = () => {
//   const [questions, setQuestions] = useState<PopularQuestion[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [initialLoaded, setInitialLoaded] = useState(false); // ✔ כדי להבדיל בין טעינה ראשונה ללחיצה

//   // ⚙️ טוען שאלות לפי offset ו־limit שנשלחים כפרמטרים
//   const fetchQuestions = async (customLimit: number, customOffset: number) => {
//   if (loading) return;
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/popular-questions/popular?limit=${customLimit}&offset=${customOffset}`, {
//         credentials: 'include',
//       });
//       const data: PopularQuestion[] = await response.json();
//       console.log(data)
//       setQuestions(prev => {
//         const existingIds = new Set(prev.map(q => q.id));
//         const uniqueNew = data.filter(q => !existingIds.has(q.id));
//         return [...prev, ...uniqueNew];
//       });
//       setOffset(customOffset + customLimit);

//       if (data.length < customLimit) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('שגיאה בטעינת שאלות פופולריות:', error);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };
// useEffect(() => {
//   if (!initialLoaded) {
//     setInitialLoaded(true); // קודם כל מונע טעינה כפולה
//     fetchQuestions(7, 0);
//   }
// }, []);
// const handleLoadMore = () => {
//   fetchQuestions(5, offset); // משתמש ב־offset מה־state
// };

//   return (
//     <div style={{ padding: '2rem', direction: 'rtl' }}>
//       <h2>שאלות פופולריות</h2>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {questions.map(q => (
//           <li key={q.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
//             <strong>{q.question}</strong><br />
//             <span style={{ color: '#777' }}>פופולריות: {q.popularity}</span>
//           </li>
//         ))}
//       </ul>

//       {hasMore && (
//         <button
//           onClick={handleLoadMore}
//           disabled={loading}
//           style={{
//             padding: '10px 20px',
//             fontSize: '1rem',
//             borderRadius: '8px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             marginTop: '1rem'
//           }}
//         >
//           {loading ? 'טוען...' : 'טען עוד שאלות'}
//         </button>
//       )}

//       {!hasMore && questions.length > 0 && (
//         <p style={{ color: 'gray', marginTop: '1rem' }}>לא נמצאו שאלות נוספות</p>
//       )}
//     </div>
//   );
// };

// export default PopularQuestions;
import React, { useEffect, useState } from 'react';
import { GridContainer } from '../../../shared/ui/GridContainer';


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
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchQuestions = async (customLimit: number, customOffset: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/popular-questions/popular?limit=${customLimit}&offset=${customOffset}`, {
        credentials: 'include',
      });
      const data: PopularQuestion[] = await response.json();
      setQuestions(prev => {
        const existingIds = new Set(prev.map(q => q.id));
        const uniqueNew = data.filter(q => !existingIds.has(q.id));
        return [...prev, ...uniqueNew];
      });
      setOffset(customOffset + customLimit);
      if (data.length < customLimit) setHasMore(false);
    } catch (error) {
      console.error('שגיאה בטעינת שאלות פופולריות:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialLoaded) {
      setInitialLoaded(true);
      fetchQuestions(7, 0);
    }
  }, []);

  const handleLoadMore = () => {
    fetchQuestions(5, offset);
  };

  return (
    <GridContainer maxWidth="lg" className="text-right">
<h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">שאלות פופולריות</h2>

<ul className="list-none p-0 space-y-4">
  {questions.map(q => (
    <li key={q.id} className="border-b border-gray-300 pb-2">
      <strong className="text-lg text-gray-800">{q.question}</strong><br />
      <span className="text-sm text-gray-500">פופולריות: {q.popularity}</span>
    </li>
  ))}
</ul>

{hasMore && (
<button
  onClick={handleLoadMore}
  disabled={loading}
  className="bg-[#00b894] hover:bg-[#00a383] text-white font-semibold px-4 py-2 rounded shadow transition">
  {/* <PlusIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /> */}
  {loading ? 'טוען...' : 'טען עוד שאלות'}
</button>


)}
      {!hasMore && questions.length > 0 && (
        <p className="text-gray-500 mt-4">לא נמצאו שאלות נוספות</p>
      )}
    </GridContainer>
  );
};

export default PopularQuestions;
