//import { AIInsight } from "./aiInsight";
import { useGetAnswersByIdUserQuery } from "../services/answerApi";
//import '../RecordingsList.css';

export const RecordingsList = ({userId}:any) => {

    const { data, error, isLoading } = useGetAnswersByIdUserQuery(userId);

    if (isLoading) 
        return <div>Loading...</div>;

    if (error || !data) 
        return <div>Error loading recordings</div>;
    
    return (
        <div className="recordings-container">
            <h2 className="recordings-title">רשימת הקלטות</h2>
            {data.map((recording) => (
                <div key={recording.id} className="recording-card">
                    <div className="card-header">
                        <h2 className="answer-title">מענה לשאלה: {recording.questionId}</h2>
                        <a href={recording.fileUrl} download>
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
                            <span className="date-value">{new Date(recording.submittedAt).toLocaleDateString('he-IL')}</span>
                        </div>
                        {/* <div><AIInsight /></div> */}
                    </div>
                    <div className="audio-section">
                        <audio className="audio-player" controls>
                            <source src={recording.fileUrl} type="audio/mpeg" />
                            הדפדפן שלך לא תומך בנגן האודיו
                        </audio>
                    </div>
                </div>
            ))}
        </div>
    )
}