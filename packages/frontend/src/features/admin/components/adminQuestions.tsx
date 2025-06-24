import { useState } from "react";
import { useGetAllQuestionsQuery } from "../services/adminQuestionApi"
import './adminQuestions.css';
import { DeleteQuestion } from "./deleteQuestion";

type AdminQuestionsProps = {
  allowedRoles: string[];
  children: React.ReactNode; 
};

export const AdminQuestions : React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {

  const { data, isLoading } = useGetAllQuestionsQuery();
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  if (isLoading)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">טוען...</h2></div>
  if (!data)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">ישנה בעיה בטעינת השאלות</h2></div>
  if (data.length === 0)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">אין שאלות</h2></div>
  

  const deleteClick = (idQuestion: string) => {
    setQuestionToDelete(idQuestion);
  };
  

  return (
    <div className="admin-questions-container">
      <h2 className="admin-questions-title">ניהול שאלות</h2>
      {data.map((question) => (
        <div key={question.id} className="question-card">
          <div className="question-header">
            <h3 className="question-title">{question.title}</h3>
          </div>
          <div className="question-actions">
            <button className="action-button edit-button">
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
              </svg>
              עריכה
            </button>
            <button className="action-button delete-button" onClick={() => deleteClick(question.id)}>
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
              </svg>
              מחיקה
            </button>
          </div>
        </div>
      ))}
      {questionToDelete && (
        <DeleteQuestion id={questionToDelete} onClose={() => setQuestionToDelete(null)} />
      )}
    </div>
  )
}
