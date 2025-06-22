
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
import { useGetQuestionsQuery } from "../services/questionsApi";
import "./Simulation.css";
import { useNavigate } from "react-router-dom";
const Simulation: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector(
    (state: RootState) => state.simulation
  );
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetQuestionsQuery();
  useEffect(() => {
    if (data) {
      const mappedQuestions = data.map((q: any) => ({
        id: q.id,
        title: q.title || "",
        content: q.content || "",
        category: q.category || "",
        tips: q.tips || "",
        type: q.question_type || q.type || "open",
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
  // טיפול בטעינה, שגיאה, והיעדר שאלות
  if (isLoading) {
    return <div style={{ padding: "40px", fontSize: "18px" }}>טוען שאלות...</div>;
  }
  if (error) {
    return <div style={{ padding: "40px", color: "red" }}>שגיאה בטעינת שאלות</div>;
  }
  if (!questions.length || currentIndex >= questions.length) {
    return <div>אין שאלות להצגה</div>;
  }
  const currentQuestion = questions[currentIndex];
  return (
    <div className="simulation-container">
      {/* סרגל ניווט */}
      <div className="sidebar">
        <div className="sidebar-header">
          {`${currentIndex + 1} מתוך ${questions.length}`}
        </div>
        <div className="nav-buttons">
          <button onClick={() => dispatch(prevQuestion())} className="nav-arrow">
            :arrow_up:
          </button>
        </div>
        <div className="question-buttons scrollable">
          {questions.map((q: interviewType, i: number) => (
            <button
              key={q.id}
              onClick={() => dispatch(goToQuestion(i))}
              className={`question-button
                ${q.answered ? "answered" : ""}
                ${i === currentIndex ? "current" : ""}
              `}
              title={`שאלה ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="nav-buttons">
          <button onClick={() => dispatch(nextQuestion())} className="nav-arrow">
            :arrow_down:
          </button>
        </div>
      </div>
      {/* תצוגת שאלה */}
      <div className="main-content">
        <div className="question-title">שאלה {currentIndex + 1}</div>
        <div className="question-text">{currentQuestion.content}</div>
        {/* שאלה פתוחה */}
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
        {/* כפתורים */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {currentIndex === questions.length - 1 ? (
            <button
              className="answer-button"
              onClick={handleSubmit}
              style={{ backgroundColor: "#28A745" }}
            >
              שליחת שאלון
            </button>
          ) : (
            <button
              className="answer-button"
              onClick={() => {
                handleTextChange(currentQuestion.answer ?? "");
                setTimeout(() => dispatch(nextQuestion()), 300);
              }}
            >
              אישור
            </button>
          )}
          <button
            className="answer-button"
            onClick={handleReset}
            style={{ backgroundColor: "#DC3545" }}
          >
            איפוס תשובה
          </button>
        </div>
      </div>
    </div>
  );
};
export default Simulation;