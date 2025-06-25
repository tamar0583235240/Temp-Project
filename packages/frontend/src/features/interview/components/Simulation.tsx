
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  prevQuestion,
  goToQuestion,
  answerQuestion,
  resetQuestion,
  setQuestions,
} from "../store/simulationSlice";
import { RootState } from "../../../shared/store/store";
import { interviewType } from "../types/questionType";
import { useGetAllQuestionsQuery } from "../services/questionsApi";
import "./Simulation.css";
import { useNavigate } from "react-router-dom";
// import AnswerAI from "./AnswerAI";

const Simulation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const { data, isLoading, error } = useGetAllQuestionsQuery();

  useEffect(() => {
    if (data) {
      const mappedQuestions = data.map((q: any) => ({
  id: q.id,
  title: q.title || "",
  content: q.content || "",
  category: q.category || "",
  tips: q.tips || "",
  type: q.question_type || q.type || "open",
  question_type: q.question_type || q.type || "open", // הוספה חשובה!
  options: q.options || [],
  answered: false,
  answer: q.answer || "",
  aiGuidance: q.aiGuidance || "",
  isActive: q.isActive ?? false,
}));
      dispatch(setQuestions(mappedQuestions));
    }
  }, [data, dispatch]);

  const handleTextChange = (value: string) => {
    dispatch(answerQuestion({ index: currentIndex, answer: value }));
  };
  const handleReset = () => {
    dispatch(resetQuestion(currentIndex));
  };
  const handleSubmit = () => {
    handleTextChange(currentQuestion.answer ?? "");
    navigate("/summary");
  };

  if (isLoading) return <div className="loading">טוען שאלות...</div>;
  if (error) return <div className="error">שגיאה בטעינת שאלות</div>;
  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;

  const currentQuestion = questions[currentIndex];
  return (
    <div className="simulation-container">
      {/* סרגל צד לניווט בין שאלות */}
      <div className="sidebar">
        <div className="sidebar-header">{`${currentIndex + 1} מתוך ${questions.length}`}</div>
        <div className="nav-buttons">
          <button onClick={() => dispatch(prevQuestion())} className="nav-arrow">▲</button>
        </div>
        <div className="question-buttons scrollable">
          {questions.map((q: interviewType, i: number) => (
            <button
              key={q.id}
              onClick={() => dispatch(goToQuestion(i))}
              className={`question-button ${q.answered ? "answered" : ""} ${i === currentIndex ? "current" : ""}`}
              title={`שאלה ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="nav-buttons">
          <button onClick={() => dispatch(nextQuestion())} className="nav-arrow">▼</button>
        </div>
      </div>

      {/* תוכן השאלה */}
      <div className="main-content">
        <div className="question-title">שאלה {currentIndex + 1}</div>
        <div className="question-text">{currentQuestion.content}</div>

        {currentQuestion.type === "open" ? (
          <textarea
            className="answer-input"
            value={currentQuestion.answer ?? ""}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="הקלד/י את תשובתך כאן..."
          />
        ) : (
          <div className="options-list">
            {currentQuestion.options?.map((option, i) => (
              <label key={i} className="option-item">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={currentQuestion.answer === option}
                  onChange={() => handleTextChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}

        {/* כפתורי פעולה */}
        <div className="button-group" style={{ marginTop: "20px" }}>
          {currentIndex === questions.length - 1 ? (
            <button className="answer-button" onClick={handleSubmit} style={{ backgroundColor: "#28A745" }}>
              שליחת שאלון
            </button>
          ) : (
            // <button
            //   className="answer-button"
            //   onClick={() => {
            //     handleTextChange(currentQuestion.answer ?? "");
            //     setTimeout(() => dispatch(nextQuestion()), 300);
            //   }}
            // >
            //   אישור
            // </button>
            <button
  className="answer-button"
  onClick={() => {
    handleTextChange(currentQuestion.answer ?? "");
    
    // איסוף כל ה־IDs של התשובות
    const answeredIds = questions.map((q) => q.id);

    // ניווט למסך AnswerAI עם ה־ids כ־state
    navigate("/answers", { state: { answerIds: answeredIds } });
  }}
  style={{ backgroundColor: "#007BFF" }}
>
  אישור
</button>
          )}
          <button className="answer-button" onClick={handleReset} style={{ backgroundColor: "#DC3545" }}>
            איפוס תשובה
          </button>
        </div>
      </div>
    </div>
  );
};
export default Simulation;