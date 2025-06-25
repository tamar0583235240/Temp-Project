import React, { useState, useEffect } from 'react';
import { Answer } from '../types/Answer';
import { TitleQuestions } from './question';
import { Button } from '../../../shared/ui/button';
import { cn } from '../../../shared/utils/cn';

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
    <div className="fixed top-24 right-4 w-80 z-40 p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text-main">סינון</h2>
        <Button
          variant="primary-dark"
          size="sm"
          onClick={clearFilters}
          className="text-xs"
        >
          נקה סינון
        </Button>
      </div>

      {/* Date Filter Section */}
      <div className="mb-8">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowDateFilters(!showDateFilters)}
        >
          <span>תאריך</span>
          <span className="text-sm">{showDateFilters ? '-' : '+'}</span>
        </h4>
        
        {showDateFilters && (
          <div className="flex flex-col gap-3 pr-2">
            <label className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
              <input
                type="radio"
                name="date"
                checked={filterCriteria.dateFilter === 'latest'}
                onChange={() => toggleDateFilter('latest')}
                className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
              />
              הכי חדשה
            </label>
            <label className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
              <input
                type="radio"
                name="date"
                checked={filterCriteria.dateFilter === 'lastWeek'}
                onChange={() => toggleDateFilter('lastWeek')}
                className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
              />
              מהשבוע האחרון
            </label>
            <label className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
              <input
                type="radio"
                name="date"
                checked={filterCriteria.dateFilter === 'lastMonth'}
                onChange={() => toggleDateFilter('lastMonth')}
                className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
              />
              מהחודש האחרון
            </label>
          </div>
        )}
      </div>

      {/* Question Filter Section */}
      <div className="mb-8">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowQuestionFilters(!showQuestionFilters)}
        >
          <span>שאלה</span>
          <span className="text-sm">{showQuestionFilters ? '-' : '+'}</span>
        </h4>
        
        {showQuestionFilters && (
          <div className="flex flex-col gap-3 pr-2">
            {uniqueQuestions.map(q => (
              <label key={q} className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
                <input
                  type="radio"
                  name="question"
                  checked={filterCriteria.questionName === q}
                  onChange={() => toggleQuestionFilter(q)}
                  className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
                />
                <TitleQuestions data={q} />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Filter Section */}
      <div className="mb-4">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowFeedbackFilter(!showFeedbackFilter)}
        >
          <span>כמות פידבקים</span>
          <span className="text-sm">{showFeedbackFilter ? '-' : '+'}</span>
        </h4>
        
        {showFeedbackFilter && (
          <div className="flex flex-col gap-3 pr-2">
            <label className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
              <input
                type="radio"
                name="feedback"
                checked={filterCriteria.feedbackCategory === 'none'}
                onChange={() => toggleFeedbackFilter('none')}
                className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
              />
              ללא פידבק
            </label>
            <label className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
              <input
                type="radio"
                name="feedback"
                checked={filterCriteria.feedbackCategory === 'low'}
                onChange={() => toggleFeedbackFilter('low')}
                className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
              />
              1–3 פידבקים
            </label>
            <label className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
              <input
                type="radio"
                name="feedback"
                checked={filterCriteria.feedbackCategory === 'high'}
                onChange={() => toggleFeedbackFilter('high')}
                className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
              />
              4+
            </label>
          </div>
        )}
      </div>
    </div>
  );
};