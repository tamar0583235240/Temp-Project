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
import { DeleteQuestion } from "./deleteQuestion";
import { Button } from "../../../shared/ui/button";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Heading1 } from "../../../shared/ui/typography";
import { CardSimple } from "../../../shared/ui/card";
import { UpdateQuestion } from "./updateQuestion";
import { useUpdateQuestionByIdMutation } from "../services/adminQuestionApi";


type AdminQuestionsProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export const AdminQuestions: React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {
  const { data, isLoading } = useGetAllQuestionsQuery();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [updateQuestionById] = useUpdateQuestionByIdMutation();
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  if (isLoading)
    return (
      <GridContainer className="text-center" dir="rtl">
        <Heading1>טוען...</Heading1>
      </GridContainer>
    );

  if (!data)
    return (
      <GridContainer className="text-center" dir="rtl">
        <Heading1>ישנה בעיה בטעינת השאלות</Heading1>
      </GridContainer>
    );

  if (data.length === 0)
    return (
      <GridContainer className="text-center" dir="rtl">
        <Heading1>אין שאלות</Heading1>
      </GridContainer>
    );

  const activeQuestions = data.filter(question => question.is_active === true);

  const deleteClick = (idQuestion: string) => {
    setQuestionToDelete(idQuestion);
  };

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
    <GridContainer maxWidth="lg" className="text-center" dir="rtl">
      <Heading1 className="mb-8">ניהול שאלות</Heading1>
      
      {activeQuestions.length === 0 ? (
        <div className="text-center">
          <p className="text-text-secondary text-lg">אין שאלות פעילות</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeQuestions.map((question) => (
            <CardSimple
              key={question.id}
              className="max-w-2xl mx-auto overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-primary-dark text-white py-2 px-4 -m-4 mb-4">
                <h3 className="text-base font-semibold text-center">
                  {question.title}
                </h3>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                <Button
                  variant="outline"
                  className="bg-success hover:bg-success/90"
                  icon={
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                    </svg>
                  }
                >
                  עריכה
                </Button>

                <Button
                  variant="danger"
                  onClick={() => deleteClick(question.id)}
                  icon={
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
                    </svg>
                  }
                >
                  מחיקה
                </Button>
              </div>
            </CardSimple>
          ))}
        </div>
      )}

      {questionToDelete && (
        <DeleteQuestion id={questionToDelete} onClose={() => setQuestionToDelete(null)} />
      )}
    </GridContainer>
  );
};
