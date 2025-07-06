// בס"ד

import { data } from "react-router-dom";
import { useGetAllInterviewExperiencesQuery } from "../services/interviewExperiencesApi";

export const InterviewExperiencesList = () => {
  const { data: interviewExperiences, isLoading, isError } = useGetAllInterviewExperiencesQuery();
  if (isLoading) {
    return <div>טוען...</div>;
  }

  if (isError) {
    return <div>אירעה שגיאה</div>;
  }

  else return <div>
    <h1>שיתוף חוויות מראיונות עבודה שלכן</h1>
    { interviewExperiences && interviewExperiences.map((interviewExperience) => (
      <div key={interviewExperience.id}>
      {interviewExperience.anonymous?<section>💁‍♂️</section>:<section>👤</section>}<p>מתראיין לחברת {interviewExperience.company_name}</p><br></br>
      <p>התפקיד אליו התראיין: {interviewExperience.position}</p>
      <p>תיאור החוויה: {interviewExperience.description?.substring(0,69)}...</p>
      
      </div>
    ))}
  </div>
}