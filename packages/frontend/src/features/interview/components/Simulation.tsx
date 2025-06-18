import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  nextQuestion,
  prevQuestion,
  goToQuestion,
  answerQuestion,
  resetQuestion,
  setQuestions,
} from "../store/slices/simulationSlice";
import { RootState } from "../store/store";
import { QuestionType } from "../types/questionType";
import "./Simulation.css";
import { useNavigate } from "react-router-dom";



const Simulation: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector(
    (state: RootState) => state.simulation
  );

  useEffect(() => {
    const dummyQuestions: QuestionType[] = [
      {
        id: 1,
        text: "מהי מטרת React?",
        answered: false,
        type: "open",
      },
      {
        id: 2,
        text: "באיזו שנה יצא Redux Toolkit?",
        answered: false,
        type: "closed",
        options: ["2015", "2019", "2021"],
      },
      {
        id: 3,
        text: "הסבר בקצרה מה זה TypeScript.",
        answered: false,
        type: "open",
      },
    ];
    dispatch(setQuestions(dummyQuestions));
  }, [dispatch]);

  const handleTextChange = (value: string) => {
    dispatch(answerQuestion({ index: currentIndex, answer: value }));
  };

  const handleReset = () => {
    dispatch(resetQuestion(currentIndex));
  };
const navigate = useNavigate();

const handleSubmit = () => {
  handleTextChange(currentQuestion.answer ?? "");
  navigate("/summary");
};

  if (!questions.length || currentIndex >= questions.length) {
    return (
      <div style={{ padding: "40px", fontSize: "18px" }}>טוען שאלות...</div>
    );
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
            ⬆️
          </button>
        </div>

        <div className="question-buttons scrollable">
          {questions.map((q: QuestionType, i: number) => (
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
            ⬇️
          </button>
        </div>
      </div>

      {/* תצוגת שאלה */}
      <div className="main-content">
        <div className="question-title">שאלה {currentIndex + 1}</div>
        <div className="question-text">{currentQuestion.text}</div>

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
              style={{ backgroundColor: "#28a745" }}
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
            style={{ backgroundColor: "#dc3545" }}
          >
            איפוס תשובה
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
export {};
