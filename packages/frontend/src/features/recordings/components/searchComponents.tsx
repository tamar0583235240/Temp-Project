import React, { useEffect, useState } from 'react'
import { Answer } from '../types/answer';

const Arrrecordings: Answer[] = [
    {
        id: "1",
        userId: "הקלטה 1",
        questionId: "5",
        fileUrl: "2023-09-10",
        answerFileName:"תשובה לשאלה 1",
        submittedAt:new Date("2023-09-10"),
    },
    {
        id: "2",
        userId: "הקלטה 2",
        questionId: "7",
        fileUrl: "2023-09-11",
        answerFileName:"תשובה לשאלה 2",
        submittedAt: new Date("2023-09-10"),
    }
];

const SearchComponents = () => {
  const [recordings,setRecordings] = useState<Answer[]>(Arrrecordings);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const filteredData = recordings.filter(r => r.answerFileName.includes(searchText));
    setRecordings(filteredData);
}, [searchText]);
  return (
    <div>
       <input type="text" placeholder="חפש הקלטה" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
       <h3>הקלטות</h3>
       {recordings.map((recording) => (
        <div>
          <p>{recording.userId}</p>
          <p>{recording.questionId}</p>
          <p>{recording.fileUrl}</p>
          <p>{recording.answerFileName}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchComponents