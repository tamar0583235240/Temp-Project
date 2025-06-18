// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';
// import {
//   setItems,
//   nextQuestion,
//   previousQuestion,
// } from '../store/interviewSlice';
// import { useGetAllQuestionsQuery } from '../services/interviewApi';

// const InterviewComponent: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { data: questions, isLoading } = useGetAllQuestionsQuery();
//   const currentIndex = useAppSelector((state) => state.interview.currentIndex);
//   const currentQuestion = useAppSelector((state) => state.interview.data[currentIndex]);

//   useEffect(() => {
//     if (questions) {
//       dispatch(setItems(questions));
//     }
//   }, [questions]);

//   const handleNext = () => {
//     dispatch(nextQuestion());
//   };

//   const handlePrevious = () => {
//     dispatch(previousQuestion());
//   };

//   if (isLoading || !currentQuestion) return <p>טוען...</p>;

//   return (
//     <div>
//       <h2>{currentQuestion.title}</h2>
//       <p>{currentQuestion.content}</p>

//       <button onClick={handlePrevious} disabled={currentIndex === 0}>
//         שאלה קודמת
//       </button>
//       <button onClick={handleNext}   disabled={currentIndex === (questions?.length ?? 0) - 1}>
//         שאלה הבאה
//       </button>
//     </div>
//   );
// };

// export default InterviewComponent;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';

const InterviewComponent = () => {
  const questions = useAppSelector(state => state.interview.data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnd, setShowEnd] = useState(false);

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

  if (!currentQuestion) return <p>לא נמצאה שאלה</p>;

  return (
    <div>
      <h2>{currentQuestion.title}</h2>
      <p><strong>תוכן:</strong> {currentQuestion.content}</p>
      <p><strong>קטגוריה:</strong> {currentQuestion.category}</p>
      <p><strong>טיפים:</strong> {currentQuestion.tips}</p>
      <p><strong>הכוונה בינה מלאכותית:</strong> {currentQuestion.aiGuidance}</p>

      <button onClick={handlePrevious} disabled={currentIndex === 0}>
        שאלה קודמת
      </button>
      <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
        שאלה הבאה
      </button>

      <hr />
      <button onClick={() => setShowEnd(true)}>סיום השאלון</button>
      {showEnd && (
        <div >
          <button onClick={() => setShowEnd(false)}>X</button>
          <p>ברכות לרגל סיום השאלון!</p>
          <button onClick={() => navigate('/certificate')}>הנפקת תעודה</button>
          <button onClick={() => navigate('/dashboard')}>דשבורד</button>
        </div>
      )}
    </div>
  );
};

export default InterviewComponent;
