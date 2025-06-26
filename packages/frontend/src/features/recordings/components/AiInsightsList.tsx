import { useState } from "react";
import { useGetAiInsightsByAnswerIdQuery } from "../services/AiInsightsApi";
import "./AiInsightsList.css";

export const AiInsightsList = (props: any) => {

    const { answerId } = props
    const { data, isLoading, isError } = useGetAiInsightsByAnswerIdQuery(answerId);
    const [viewAiIn, setViewAiIn] = useState(false)
    return <div className="ai-insights-container">
        <button 
            className="ai-insights-toggle-btn" 
            onClick={() => setViewAiIn(!viewAiIn)}
        >
            תובנות AI
        </button>
        {viewAiIn && <dialog className="ai-insights-dialog" open>
            {isLoading && <p className="ai-insights-loading">Loading...</p>}
            {isError && <p className="ai-insights-error">Error fetching AI insights</p>}
            {data && (
                <div className="ai-insights-list">
                    {data.map((insight) => (
                        <div key={insight.id} className="ai-insight-item">
                            <p className="ai-insight-summary">
                                <span className="ai-insight-label">Summary:</span> {insight.summary}
                            </p>
                            <p className="ai-insight-rating">
                                <span className="ai-insight-label">Rating:</span> {insight.rating}
                            </p>
                            <p className="ai-insight-strengths">
                                <span className="ai-insight-label">Strengths:</span> {insight.strengths}
                            </p>
                            <p className="ai-insight-improvements">
                                <span className="ai-insight-label">Improvements:</span> {insight.improvements}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </dialog>}


    </div>;
};