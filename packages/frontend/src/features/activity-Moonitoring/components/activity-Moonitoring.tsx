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
    if (loading || !hasMore) return; // מניעת טעינה כפולה
    setLoading(true);
    try {
      const response = await fetch(`/api/questions/popular?limit=${limit}&offset=${offset}`);
      const data: PopularQuestion[] = await response.json();

      setQuestions(prev => [...prev, ...data]);
      setOffset(prev => prev + limit);

      // אם חזרו פחות מ־limit שאלות, סימן שלא נשארו שאלות נוספות
      if (data.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('שגיאה בטעינת שאלות פופולריות:', error);
      setHasMore(false); // במקרה שגיאה, לא לנסות שוב
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
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading ? 'טוען...' : 'טען עוד שאלות'}
        </button>
      )}

      {!hasMore && questions.length > 0 && (
        <p style={{ color: 'gray', marginTop: '1rem' }}>לא נמצאו שאלות נוספות</p>
      )}
    </div>
  );
};

export default PopularQuestions;
