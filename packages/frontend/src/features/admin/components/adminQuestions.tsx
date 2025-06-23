import { useGetAllQuestionsQuery } from "../services/adminQuestionApi"
import './adminQuestions.css';

type AdminQuestionsProps = {
  allowedRoles: string[];
  children: React.ReactNode; 
};

export const AdminQuestions : React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {

  const { data, isLoading } = useGetAllQuestionsQuery();
  
  if (isLoading)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">טוען...</h2></div>
  if (!data)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">ישנה בעיה בטעינת השאלות</h2></div>
  if (data.length === 0)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">אין שאלות</h2></div>
  
  return (
    <div className="admin-questions-container">
      <h2 className="admin-questions-title">ניהול שאלות</h2>
      {data.map((question) => (
        <div key={question.id} className="question-card">
          <div className="question-header">
            <h3 className="question-title">{question.title}</h3>
          </div>
          <div className="question-actions">
            <button className="action-button edit-button">עריכה</button>
            <button className="action-button delete-button">מחיקה</button>
          </div>
        </div>
      ))}
    </div>
  )
}
