// בס"ד

import { data } from "react-router-dom";
import { useGetAllInterviewExperiencesQuery } from "../services/interviewExperiencesApi";
import { useGetAllExperienceThanksQuery } from '../services/experienceThanksApi';
import { experienceThanks } from "../types/experienceThanks";

export const InterviewExperiencesList = () => {
  const { data: interviewExperiences, isLoading, isError } = useGetAllInterviewExperiencesQuery();
  const { data: experienceThanks, isLoading: thanksLoading, isError: thanksError } = useGetAllExperienceThanksQuery();  

  function getThunksByInterviewExperienceId(interviewExperienceId: string): experienceThanks[] {
    return ( experienceThanks? experienceThanks.filter(thanks => thanks.experience_id === interviewExperienceId) : [] );
  }

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
      <p>כמה נהניתי?</p>
      <div >
                                        {Array.from({ length: 5 }, (_, index) => {
                                            const rating = interviewExperience.rating || 0;
                                            return (
                                                <span key={index} className={`text-yellow-500 text-2xl `}>{index < rating ? '★' : '☆'}</span>
                                            );
                                        })}
                                    </div>
      <p>פורסם ב {new Date(interviewExperience.created_at?interviewExperience.created_at:'')?.toLocaleDateString()}</p>
      <p>🙏 {getThunksByInterviewExperienceId(interviewExperience.id).length} תודות </p>
      
      </div>
    ))}
  </div>
}