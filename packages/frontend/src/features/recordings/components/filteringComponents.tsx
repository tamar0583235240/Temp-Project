import React, { useState, useEffect } from 'react';
import { Answer } from '../types/Answer';
import './filteringComponents.css';
import { TitleQuestions } from './question';

export const FilteringComponents = (props: {
  filterCriteria: {
    dateFilter: string;
    questionName: string;
    feedbackCategory: string;
  };
  setFilterCriteria: (criteria: {
    dateFilter: string;
    questionName: string;
    feedbackCategory: string;
  }) => void;
  originalAnswers: Answer[];
}) => {
  const { filterCriteria, setFilterCriteria, originalAnswers } = props;

  const [showDateFilters, setShowDateFilters] = useState(true);
  const [showQuestionFilters, setShowQuestionFilters] = useState(true);
  const [showFeedbackFilter, setShowFeedbackFilter] = useState(true);

  const uniqueQuestions = Array.from(new Set(originalAnswers.map(a => a.question_id)));

  const toggleDateFilter = (value: string) => {
    setFilterCriteria({ ...filterCriteria, dateFilter: value });
  };

  const toggleQuestionFilter = (value: string) => {
    setFilterCriteria({ ...filterCriteria, questionName: value });
  };

  const toggleFeedbackFilter = (value: string) => {
    setFilterCriteria({ ...filterCriteria, feedbackCategory: value });
  };

  const clearFilters = () => {
    setFilterCriteria({ dateFilter: 'all', questionName: '', feedbackCategory: '' });
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>סינון</h2>
        <button className="clear-button" onClick={clearFilters}>נקה סינון</button>
      </div>

      <div className="filter-section">
        <h4
          className="toggle-title"
          onClick={() => setShowDateFilters(!showDateFilters)}
          style={{ cursor: 'pointer' }}
        >
          תאריך {showDateFilters ? '-' : '+'}
        </h4>
        {showDateFilters && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="date"
                checked={filterCriteria.dateFilter === 'latest'}
                onChange={() => toggleDateFilter('latest')}
              /> הכי חדשה
            </label>
            <label>
              <input
                type="radio"
                name="date"
                checked={filterCriteria.dateFilter === 'lastWeek'}
                onChange={() => toggleDateFilter('lastWeek')}
              /> מהשבוע האחרון
            </label>
            <label>
              <input
                type="radio"
                name="date"
                checked={filterCriteria.dateFilter === 'lastMonth'}
                onChange={() => toggleDateFilter('lastMonth')}
              />
              מהחודש האחרון
            </label>
          </div>
        )}
      </div>

      <div className="filter-section">
        <h4
          className="toggle-title"
          onClick={() => setShowQuestionFilters(!showQuestionFilters)}
          style={{ cursor: 'pointer' }}
        >
          שאלה {showQuestionFilters ? '-' : '+'}
        </h4>
        {showQuestionFilters && (
          <div className="filter-options">
            {uniqueQuestions.map(q => (
              <label key={q}>
                <input
                  type="radio"
                  name="question"
                  checked={filterCriteria.questionName === q}
                  onChange={() => toggleQuestionFilter(q)}
                />
                <TitleQuestions data={q} />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <h4
          className="toggle-title"
          id='feedback-filter-title'
          onClick={() => setShowFeedbackFilter(!showFeedbackFilter)}
          style={{ cursor: 'pointer' }}
        >
          כמות פידבקים {showFeedbackFilter ? '-' : '+'}
        </h4>
        {showFeedbackFilter && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="feedback"
                checked={filterCriteria.feedbackCategory === 'none'}
                onChange={() => toggleFeedbackFilter('none')}
              /> ללא פידבק
            </label>
            <label>
              <input
                type="radio"
                name="feedback"
                checked={filterCriteria.feedbackCategory === 'low'}
                onChange={() => toggleFeedbackFilter('low')}
              /> 1–3 פידבקים
            </label>
            <label>
              <input
                type="radio"
                name="feedback"
                checked={filterCriteria.feedbackCategory === 'high'}
                onChange={() => toggleFeedbackFilter('high')}
              /> 4+
            </label>
          </div>
        )}
      </div>
    </div>
  );
};




