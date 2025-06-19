import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';

import { useGetAllQuestionsQuery } from '../services/buttonsApi';
import { setItems } from '../store/buttonsSlice';
import {
  buttonStyle,
  buttonDisabledStyle,
  buttonGroupStyle,
  buttonsContainerStyle,
  closeBtnStyle,
  endBtnStyle,
  modalContentStyle,
  modalStyle,
  questionCardStyle,
  questionTitleStyle
} from './buttonsStyles';

const InterviewComponent = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(state => state.interview.data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnd, setShowEnd] = useState(false);

  const { data, isLoading, error } = useGetAllQuestionsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setItems(data));
    }
  }, [data, dispatch]);

  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) return <p>טוען שאלות...</p>;
  if (error) return <p>שגיאה בטעינת שאלות</p>;
  if (!currentQuestion) return <p>לא נמצאה שאלה</p>;

  return (
    <div style={buttonsContainerStyle}>
      <button style={buttonStyle} onClick={() => navigate('/')}>לדף הבית</button>
      <div style={questionCardStyle}>
        <h2 style={questionTitleStyle}>{currentQuestion.title}</h2>
        <p><strong>תוכן:</strong> {currentQuestion.content}</p>
        <p><strong>קטגוריה:</strong> {currentQuestion.category}</p>
        <p><strong>טיפים:</strong> {currentQuestion.tips}</p>
        <p><strong>הכוונה בינה מלאכותית:</strong> {currentQuestion.aiGuidance}</p>
        <div style={buttonGroupStyle}>
          <button
            style={currentIndex === 0 ? { ...buttonStyle, ...buttonDisabledStyle } : buttonStyle}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            שאלה קודמת
          </button>
          <button
            style={currentIndex === questions.length - 1 ? { ...buttonStyle, ...buttonDisabledStyle } : buttonStyle}
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            שאלה הבאה
          </button>
        </div>
        <hr />
        <button style={endBtnStyle} onClick={() => setShowEnd(true)}>סיום השאלון</button>
      </div>
      {showEnd && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <button style={closeBtnStyle} onClick={() => setShowEnd(false)}>X</button>
            <p>ברכות לרגל סיום השאלון!</p>
            <button style={buttonStyle} onClick={() => navigate('/certificate')}>הנפקת תעודה</button>
            <button style={buttonStyle} onClick={() => navigate('/dashboard')}>דשבורד</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewComponent;