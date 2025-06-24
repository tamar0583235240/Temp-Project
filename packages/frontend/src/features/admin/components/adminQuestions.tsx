// import { use, useState } from "react";
// import { useGetAllQuestionsQuery } from "../services/adminQuestionApi"
// import './adminQuestions.css';
// import { UpdateQuestion } from "./updateQuestion";

// type AdminQuestionsProps = {
//   allowedRoles: string[];
//   children: React.ReactNode; 
// };

// export const AdminQuestions : React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {

//   const { data, isLoading } = useGetAllQuestionsQuery();
//   const [isEdit,setIsEdit]=useState(false);

//   if (isLoading)
//     return <div className="admin-questions-container"><h2 className="admin-questions-title">טוען...</h2></div>
//   if (!data)
//     return <div className="admin-questions-container"><h2 className="admin-questions-title">ישנה בעיה בטעינת השאלות</h2></div>
//   if (data.length === 0)
//     return <div className="admin-questions-container"><h2 className="admin-questions-title">אין שאלות</h2></div>

//   return (
//     <div className="admin-questions-container">
//       <h2 className="admin-questions-title">ניהול שאלות</h2>
//       {data.map((question) => (
//         <div key={question.id} className="question-card">
//           <div className="question-header">
//             <h3 className="question-title">{question.title}</h3>
//           </div>
//           <div className="question-actions">
//             <button className="action-button edit-button" onClick={()=>setIsEdit(true)}>עריכה</button>
//             <button className="action-button delete-button">מחיקה</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


import { useState } from "react";
import { useGetAllQuestionsQuery } from "../services/adminQuestionApi";
import './adminQuestions.css';
import { UpdateQuestion } from "./updateQuestion";
import { useUpdateQuestionByIdMutation } from "../services/adminQuestionApi"; // ודאי שיש לך את זה

type AdminQuestionsProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export const AdminQuestions: React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {
  const { data, isLoading } = useGetAllQuestionsQuery();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [updateQuestionById] = useUpdateQuestionByIdMutation();

  if (isLoading)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">טוען...</h2></div>;
  if (!data)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">ישנה בעיה בטעינת השאלות</h2></div>;
  if (data.length === 0)
    return <div className="admin-questions-container"><h2 className="admin-questions-title">אין שאלות</h2></div>;

  const handleEditClick = (question: any) => {
    setSelectedQuestion(question);
    setIsEdit(true);
  };

  const handleUpdateSubmit = async (id: string, formData: any) => {
    try {
      await updateQuestionById({ id, data: formData }).unwrap();
      setIsEdit(false);
      setSelectedQuestion(null);
    } catch (err) {
      console.error("שגיאה בעדכון השאלה:", err);
    }
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
            <button
              className="action-button edit-button"
              onClick={() => handleEditClick(question)}
            >
              עריכה
            </button>
            <button className="action-button delete-button">מחיקה</button>
          </div>
        </div>
      ))}

      {isEdit && selectedQuestion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UpdateQuestion
              id={selectedQuestion.id}
              initialData={selectedQuestion}
              onSubmit={handleUpdateSubmit}
            />
          </div>
          <button className="close-button" onClick={() => setIsEdit(false)}>סגור</button>
        </div>
      )}
    </div>
  );
};
