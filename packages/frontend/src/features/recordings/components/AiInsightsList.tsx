import { useState } from "react";
import { useGetAiInsightsByAnswerIdQuery } from "../services/AiInsightsApi";

export const AiInsightsList = (props: any) => {

    const { answerId } = props
    const { data, isLoading, isError } = useGetAiInsightsByAnswerIdQuery(answerId);
    const [viewAiIn, setViewAiIn] = useState(false)
    return <div>
        <button onClick={() => setViewAiIn(!viewAiIn)}>תובנות AI</button>
        {viewAiIn && <dialog open>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching AI insights</p>}
            {data && (
                <div>
                    {data.map((insight) => (
                        <div key={insight.id}>
                            <p>Summary: {insight.summary}</p>
                            <p>Rating: {insight.rating}</p>
                            <p>Strengths: {insight.strengths}</p>
                            <p>Improvements: {insight.improvements}</p>
                        </div>
                    ))}
                </div>
            )}
        </dialog>}


    </div>;
};