import React, { useEffect, useState } from 'react'
import { Answer } from '../types/Answer';

const Arrrecordings: Answer[] = [
    {
        id: "1",
        user_id: "הקלטה 1",
        question_id: "5",
        file_url: "2023-09-10",
        answer_file_name:"תשובה לשאלה 1",
        submitted_at:new Date("2023-09-10"),
    },
    {
        id: "2",
        user_id: "הקלטה 2",
        question_id: "7",
        file_url: "2023-09-11",
        answer_file_name:"תשובה לשאלה 2",
        submitted_at: new Date("2023-09-10"),
    }
];

const SearchComponents = () => {
  const [recordings,setRecordings] = useState<Answer[]>(Arrrecordings);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const filteredData = recordings.filter(r => r.answer_file_name.includes(searchText));
    setRecordings(filteredData);
}, [searchText]);
  return (
    <div>
       <input type="text" placeholder="חפש הקלטה" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
       <h3>הקלטות</h3>
       {recordings.map((recording) => (
        <div>
          <p>{recording.user_id}</p>
          <p>{recording.question_id}</p>
          <p>{recording.file_url}</p>
          <p>{recording.answer_file_name}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchComponents