import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "./Simulation.css";

const Summary: React.FC = () => {
  const { questions } = useSelector((state: RootState) => state.simulation);

  return (
    <div className="main-content" style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>סיכום השאלון</h2>
      {questions.map((q, index) => (
        <div
          key={q.id}
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f9f9f9",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {index + 1}. {q.text}
          </div>
          <div style={{ marginTop: "10px", color: "#555" }}>
            תשובתך: {q.answer ? q.answer : <i>(לא נענתה)</i>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Summary;
