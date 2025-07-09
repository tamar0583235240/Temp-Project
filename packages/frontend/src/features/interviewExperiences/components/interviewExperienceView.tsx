import { useState } from "react";
import { experienceThanks } from "../types/experienceThanks";
import { interviewExperiences } from "../types/interviewExperiences";
import { User } from "../../auth/types/types";
import { RootState } from '../../../shared/store/store';
import { useAddExperienceThanksMutation } from '../services/experienceThanksApi'
import { useSelector } from "react-redux";

export const InterviewExperienceView = (props: { interviewExperience: interviewExperiences, experienceThanks: experienceThanks[], users: User[] }) => {
    const { interviewExperience, experienceThanks } = props;
    const user = useSelector((state: RootState) => state.auth.user);
    const [addExperienceThanks] = useAddExperienceThanksMutation();
    const [openView, setOpenView] = useState(false);
    const [isThanks, setIsThanks] = useState(experienceThanks.find(thanks => thanks.user_id === user?.id) ? true : false);


    function addThunk() {
        let newThunk = {
            experience_id: interviewExperience.id,
            user_id: user ? user.id : '1',
            created_at: new Date(),
            id: '1'
        }
        addExperienceThanks(newThunk);
        setIsThanks(true);
    }

    function getUserNameById(userId: string): string {
        const user = props.users.find(user => user.id === userId);
        console.log(user);

        return user ? user.first_name + ' ' + user.last_name : 'Unknown User';
    }

    return <div>
        <button onClick={() => setOpenView(!openView)}>הצג פרטים</button>
        <dialog open={openView}>
            <h3>משתמשת משתפת בחוויות מראיון </h3>
            <p>{interviewExperience.anonymous ? '💁‍♂️' +  getUserNameById(interviewExperience.user_id ?interviewExperience.user_id : '') : '👤אנונימית'}</p>
            <p>מתראיין לחברת {interviewExperience.company_name}</p>
            <p>התפקיד אליו התראיין: {interviewExperience.position}</p>

            <p>:שאלות שנשאלו בראיון</p>
            <p>{interviewExperience.questions}</p>
            <p>תיאור החוויה: {interviewExperience.description}</p>
            <p>כמה נהניתי?</p>
            <div>
                {Array.from({ length: 5 }, (_, index) => {
                    const rating = interviewExperience.rating || 0;
                    return (
                        <span key={index} className={`text-yellow-500 text-2xl `}>{index < rating ? '★' : '☆'}</span>
                    );
                })}
            </div>
            <p>הטיפים שלי להצלחה :</p>
            <p>{interviewExperience.tips}</p>
            <p>{interviewExperience.hired ? 'התקבלה לעבודה! ✅' : 'לא התקבלה לעבודה ❌'}</p>
            <p> {experienceThanks.length} תודות </p>
            <button onClick={addThunk} disabled={isThanks || experienceThanks.find(e => e.experience_id == interviewExperience.id && e.user_id == user?.id) != undefined}>🙏 תודה על השיתוף</button>
            <p>פורסם ב {new Date(interviewExperience.created_at ? interviewExperience.created_at : '')?.toLocaleDateString()}</p>

        </dialog>
    </div>
}
