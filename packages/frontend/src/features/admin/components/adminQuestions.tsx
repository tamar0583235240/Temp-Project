import { useGetAllQuestionsQuery } from "../services/adminQuestionApi"

type AdminQuestionsProps = {
  allowedRoles: string[];
  children: React.ReactNode; 
};

export const AdminQuestions : React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {

  const { data, isLoading } = useGetAllQuestionsQuery();
  if (isLoading)
    return <h2>טוען...</h2>
  if (!data)
    return <h2>ישנה בעיה בטעינת השאלות</h2>
  if (data.length === 0)
    return <h2>אין שאלות</h2>
  return (
    <div>
      <h2>ניהול שאלות</h2>
      {data.map((question) => (
        <span>{question.title}</span>
      ))}
    </div>
  )
}