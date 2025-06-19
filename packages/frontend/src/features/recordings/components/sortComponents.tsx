import React, { useState } from 'react';
import { useGetAnswersByIdUserQuery } from '../services/answerApi';
import './sortComponents.css';

export const SortComponents = ({}:any) => {
  const { data: answers, isLoading, error } = useGetAnswersByIdUserQuery(
    '00000000-0000-0000-0000-000000000004'
  );

  const [sortOption, setSortOption] = useState('latest');
  const sortOptions = [
    { value: 'latest', label: 'מהחדש לישן' },
    { value: 'oldest', label: 'מהישן לחדש' },
    { value: 'mostFeedbacks', label: 'כמות פידבקים מגבוה לנמוך' },
    { value: 'leastFeedbacks', label: 'כמות פידבקים מהנמוך לגבוה' },
  ];

  const sortedAnswers = answers ? [...answers].sort((a, b) => {
    switch (sortOption) {
      case 'latest':
        return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
      case 'oldest':
        return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
      case 'mostFeedbacks':
        return b.amount_feedbacks - a.amount_feedbacks;
      case 'leastFeedbacks':
        return a.amount_feedbacks - b.amount_feedbacks;
      default:
        return 0;
    }
  }) : [];

  if (isLoading) return <div>טוען...</div>;
  if (error || !answers) return <div>שגיאה בטעינת התשובות</div>;

  return (
    <div className="sort-container">
      <div className="sort-label-container">
        <span className="sort-label">מיין לפי:</span>
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

