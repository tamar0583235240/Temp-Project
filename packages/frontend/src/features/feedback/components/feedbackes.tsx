// בס"ד

import { useState } from "react"
import "./feedbackes.css"
import { useGetFeedbackesBysharedRecordingIdQuery } from "../services/feedbackApi"
import { Users } from "../types/Users"

export const Feedbackes = ({props}:{props: {sharedRecordingId: string , usersList: Users[]}}) => {
    const {sharedRecordingId , usersList} = props
    const { data: feedbackes, isLoading, error } = useGetFeedbackesBysharedRecordingIdQuery(sharedRecordingId)
    
    const [flagShow , setFlagShow] = useState<boolean>(false)   

    function getUserName(userId: string): string {
        const user = usersList.find(user => user.id == userId);
        return user ? user.first_name + " "  + user.last_name: 'Unknown User';
    }

    function showFidbackes(): void {
        console.log(feedbackes);
        
       setFlagShow(!flagShow)
       console.log(error);
       
    }

    return(
        <div className="recordes-container">
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
                                <h4 className="feedback-from">{getUserName(f?.given_by_user_id)}</h4>
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