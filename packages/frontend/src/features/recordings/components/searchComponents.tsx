import React, { useState } from 'react'
import { Answer } from '../types/Answer';
import { useGetAnswersByIdUserQuery } from '../services/answerApi';
import { data } from 'react-router-dom';

export const SearchComponents = ({ }: any) => {
  const { data: answers, isLoading, error } = useGetAnswersByIdUserQuery(
    "00000000-0000-0000-0000-000000000004"
  );
  const [searchText, setSearchText] = useState("");
  if (isLoading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת התשובות</div>;
  const filteredAnswers = answers?.filter((answer) =>
    answer.answer_file_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="חפש הקלטה" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    </div>
  )
}