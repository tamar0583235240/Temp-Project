import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';
import {
  setItems,
  nextQuestion,
  previousQuestion,
} from '../store/interviewSlice';
import { useGetAllQuestionsQuery } from '../services/interviewApi';

const InterviewComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: questions, isLoading } = useGetAllQuestionsQuery();
  const currentIndex = useAppSelector((state) => state.interview.currentIndex);
  const currentQuestion = useAppSelector((state) => state.interview.data[currentIndex]);

  useEffect(() => {
    if (questions) {
      dispatch(setItems(questions));
    }
  }, [questions]);

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  if (isLoading || !currentQuestion) return <p>טוען...</p>;

  return (
    <div>
      <h2>{currentQuestion.title}</h2>
      <p>{currentQuestion.content}</p>

      <button onClick={handlePrevious} disabled={currentIndex === 0}>
        שאלה קודמת
      </button>
      <button onClick={handleNext}   disabled={currentIndex === (questions?.length ?? 0) - 1}>
        שאלה הבאה
      </button>
    </div>
  );
};

export default InterviewComponent;
