
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';
import { useGetAllQuestionsQuery } from '../services/buttonsApi';
import { setItems } from '../store/buttonsSlice';
import './InterviewComponent.css';


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
  
  const issue = () => {
    
  };

    if (isLoading) return <p>טוען שאלות...</p>;
  if (error) return <p>שגיאה בטעינת שאלות</p>;
  if (!currentQuestion) return <p>לא נמצאה שאלה</p>;

  return (
    <div className="interview-container">
      <button onClick={() => navigate('/')} >לדף הבית</button>
      <div className="question-card">
        <h2 className="question-title">{currentQuestion.title}</h2>
        <p><strong>תוכן:</strong> {currentQuestion.content}</p>
        <p><strong>קטגוריה:</strong> {currentQuestion.category}</p>
        <p><strong>טיפים:</strong> {currentQuestion.tips}</p>
        <p><strong>הכוונה בינה מלאכותית:</strong> {currentQuestion.aiGuidance}</p>
        <div className="button-group">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            שאלה קודמת
          </button>
          <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
            שאלה הבאה
          </button>
        </div>
        <hr />
        <button className="end-btn" onClick={() => setShowEnd(true)}>סיום השאלון</button>
      </div>
      {showEnd && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowEnd(false)}>X</button>
            <p>ברכות לרגל סיום השאלון!</p>
            <button onClick={() => navigate('/certificate')}>הנפקת תעודה</button>
            <button onClick={() => navigate('/dashboard')}>דשבורד</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewComponent;
