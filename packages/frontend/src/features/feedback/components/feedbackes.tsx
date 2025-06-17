// בס"ד

import { useState } from "react"
import "./feedbackes.css"
import { useGetFeedbackesBysharedRecordingIdQuery } from "../services/feedbackApi"
import { feedbackType } from "../types/feedbackType"
import { useSelector } from "react-redux"

export const Feedbackes = () => {

    type Feedback = {
        id:string,
        sharedRecordingId:string,
        givenByUserId:string,
        comment:string,
        rating?:number,
        createdAt:Date
    }

    const { data: feedbackes, isLoading, error } = useGetFeedbackesBysharedRecordingIdQuery("550e8400-e29b-41d4-a718-446655440000")
    
    const [flagShow , setFlagShow] = useState<boolean>(false)   
    const [fidback , setFidback] = useState<Feedback[]>([
        // דוגמאות לבדיקה
        { id: "1",sharedRecordingId: "100",comment: "פידבק מעולה על השיעור", givenByUserId: "יוסי כהן", createdAt: new Date() },
        { id: "2",sharedRecordingId: "200", comment: "השיעור היה מאוד מועיל", givenByUserId: "שרה לוי", createdAt: new Date() },
        { id: "3",sharedRecordingId: "300", comment: "רוצה עוד שיעורים כאלה", givenByUserId: "דוד ישראל", createdAt: new Date() }
    ])

    function showFidbackes(): void {
        console.log(feedbackes);
        
       setFlagShow(!flagShow)
       console.log(error);
       
    }

    return(
        <div className="recordes-container">
            <h1 className="recordes-title">רשומות</h1>
            <button className="feedback-toggle-btn" onClick={showFidbackes}>
                פידבקים ({feedbackes?.length})
                <span className={`arrow ${flagShow ? 'open' : ''}`}>▼</span>
            </button>
            {error && <p>Errorrr</p>}    
            {flagShow && (
                <div className="feedback-list">
                    {feedbackes?.map(f => (
                        <section key={f?.id} className="feedback-item">
                            <div className="feedback-header">
                                <h4 className="feedback-from">{f?.given_by_user_id}</h4>
                                <h4 className="feedback-date">{f?.created_at && new Date(f.created_at).toLocaleDateString()}</h4>
                            </div>
                            <p className="feedback-content">{f?.comment}</p>
                        </section>
                    ))}
                </div>
            )}
        </div>
    )   
}