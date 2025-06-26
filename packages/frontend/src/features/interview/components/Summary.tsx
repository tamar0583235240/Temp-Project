import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
// import "./Summary.css";

const Summary: React.FC = () => {
  const { questions } = useSelector((state: RootState) => state.simulation);

  return (
    <div className="summary-container">
      <h2 className="summary-title">סיכום השאלון</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <div className="question-text">{q.text}</div>
          <div className="question-text">
            {index + 1}. {q.content}
          </div>
          <div className="answer-text">
            תשובתך:{" "}
            {q.answer ? (
              q.answer
            ) : (
              <span className="answer-missing">(לא נענתה)</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Summary;
