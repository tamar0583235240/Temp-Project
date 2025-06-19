import React, { useState } from 'react';
import { useGetAnswersByIdUserQuery } from '../services/answerApi';
import { Answer } from '../types/Answer';
import './filteringComponents.css';

export const FilteringComponents = ({}: any) => {
  const { data: answers, isLoading, error } = useGetAnswersByIdUserQuery(
    '00000000-0000-0000-0000-000000000004'
  );

  const [dateFilter, setDateFilter] = useState<string>('all');
  const [questionName, setQuestionName] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('');
  const [showDateFilters, setShowDateFilters] = useState(true);
  const [showQuestionFilters, setShowQuestionFilters] = useState(true);
  const [showFeedbackFilter, setShowFeedbackFilter] = useState(true);

  if (isLoading) return <div>טוען...</div>;
  if (error || !answers) return <div>שגיאה בטעינת התשובות</div>;

  const uniqueQuestions = Array.from(new Set(answers.map((a) => a.question_id)));

  const filteredAnswers = answers.filter((answer) => {
    const submitted = new Date(answer.submitted_at);

    // סינון לפי תאריך
    let datePass = true;
    switch (dateFilter) {
      case 'latest':
        const latest = answers.reduce((a, b) =>
          new Date(b.submitted_at) > new Date(a.submitted_at) ? b : a
        );
        datePass = new Date(answer.submitted_at).getTime() === new Date(latest.submitted_at).getTime();
        break;
      case 'lastWeek':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        datePass = submitted >= oneWeekAgo;
        break;
      case 'lastMonth':
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        datePass = submitted >= start && submitted <= end;
        break;
      default:
        datePass = true;
    }

    // סינון לפי שאלה
    const questionPass = questionName === '' || answer.question_id === questionName;

    // סינון לפי כמות פידבקים
    const feedbackPass =
      feedbackCategory === '' ||
      (feedbackCategory === 'none' && answer.amount_feedbacks === 0) ||
      (feedbackCategory === 'low' && answer.amount_feedbacks >= 1 && answer.amount_feedbacks <= 3) ||
      (feedbackCategory === 'high' && answer.amount_feedbacks >= 4);

    return datePass && questionPass && feedbackPass;
  });

  const clearFilters = () => {
    setDateFilter('all');
    setQuestionName('');
    setFeedbackCategory('');
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>סינון</h2>
        <button className="clear-button" onClick={clearFilters}>נקה סינון</button>
      </div>

      <div className="filter-section">
        <h4 onClick={() => setShowDateFilters(!showDateFilters)} className="toggle-title">
           תאריך {showDateFilters ? '-' : '+'}
        </h4>
        {showDateFilters && (
          <div className="filter-options">
            <label><input type="radio" name="dateFilter" value="latest" checked={dateFilter === 'latest'} onChange={() => setDateFilter('latest')} /> ההקלטה הכי חדשה</label>
            <label><input type="radio" name="dateFilter" value="lastWeek" checked={dateFilter === 'lastWeek'} onChange={() => setDateFilter('lastWeek')} /> מהשבוע האחרון</label>
            <label><input type="radio" name="dateFilter" value="lastMonth" checked={dateFilter === 'lastMonth'} onChange={() => setDateFilter('lastMonth')} /> מהחודש הקודם</label>
          </div>
        )}
      </div>

      <div className="filter-section">
        <h4 onClick={() => setShowQuestionFilters(!showQuestionFilters)} className="toggle-title">
           שאלה {showQuestionFilters ? '-' : '+'}
        </h4>
        {showQuestionFilters && (
          <div className="filter-options">
            {uniqueQuestions.map((q) => (
              <label key={q}>
                <input
                  type="radio"
                  name="question"
                  value={q}
                  checked={questionName === q}
                  onChange={() => setQuestionName(q)}
                /> {q}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <h4 onClick={() => setShowFeedbackFilter(!showFeedbackFilter)} className="toggle-title">
         כמות פידבקים {showFeedbackFilter ? '-' : '+'} 
        </h4>
        {showFeedbackFilter && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="feedbacks"
                value="none"
                checked={feedbackCategory === 'none'}
                onChange={() => setFeedbackCategory('none')}
              /> ללא פידבק
            </label>
            <label>
              <input
                type="radio"
                name="feedbacks"
                value="low"
                checked={feedbackCategory === 'low'}
                onChange={() => setFeedbackCategory('low')}
              /> 1–3 פידבקים
            </label>
            <label>
              <input
                type="radio"
                name="feedbacks"
                value="high"
                checked={feedbackCategory === 'high'}
                onChange={() => setFeedbackCategory('high')}
              /> 4 ומעלה
            </label>
          </div>
        )}
      </div>

      {/* תצוגת התשובות המסוננות (אופציונלי) */}
      {/* <hr className="divider" />
      <h3>הקלטות:</h3>
      {filteredAnswers.map((answer) => (
        <div key={answer.id} className="record-item">
          <p><strong>שאלה:</strong> {answer.question_id}</p>
          <p><strong>קובץ:</strong> {answer.answer_file_name}</p>
          <p><strong>קישור:</strong> <a href={answer.file_url} target="_blank" rel="noreferrer">צפה</a></p>
          <p><strong>תאריך:</strong> {new Date(answer.submitted_at).toLocaleString()}</p>
        </div>
      ))} */}
    </div>
  );
};


