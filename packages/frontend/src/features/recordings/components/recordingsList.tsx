import { Feedbackes } from "../../feedback/components/feedbackes";
import { useGetAnswersByIdUserQuery, useGetQuestionByIdQuery } from "../services/answerApi";
import { AiInsightsList } from "./AiInsightsList";
import './RecordingsList.css';


export const RecordingsList = ({ user_id }: any) => {
    const { data, error, isLoading } = useGetAnswersByIdUserQuery(user_id);
    // const (data , error , isLoading) = useGetAllUsersQuery();

    if (isLoading)
        return <div>Loading...</div>;
    if (error || !data)
        return <div>Error loading recordings</div>;
    // const questions = data.map(answer => useGetQuestionByIdQuery(answer.question_id).data);
    return (
        <div className="recordings-container">
            <h2 className="recordings-title">ההקלטות שלי</h2>
            {data.map((recording, index) => {
                return(
                <div key={recording.id} className="recording-card">
                    <div className="card-header">
                        <h2 className="answer-title">מענה לשאלה: {recording.question_id}</h2>
                        <a href={recording.file_url} download>
                            <button className="download-button">
                                <svg className="download-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor" />
                                    <path d="M5 20V18H19V20H5Z" fill="currentColor" />
                                </svg> הורד הקלטה </button>

                        </a>
                    </div>
                    <div className="recording-header">
                        <div className="submission-date">
                            <span className="date-label" >תאריך הגשה:</span>
                            <span className="date-value">{new Date(recording.submitted_at).toLocaleDateString('he-IL')}</span>
                        </div>
                    </div>
                    
                    <div className="audio-section">
                        <audio className="audio-player" controls>
                            <source src={recording.file_url} type="audio/mpeg" />
                            הדפדפן שלך לא תומך בנגן האודיו
                        </audio>
                    </div>
                    <AiInsightsList answerId={recording.id}></AiInsightsList>          
                    <Feedbackes props={{sharedRecordingId:recording.id, usersList:[]}} />
                </div>
            )})}
        </div>
    )
}


