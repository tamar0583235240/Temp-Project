import React from "react";
import { useSelector } from "react-redux";
import { useGetPracticeQuestionsByTopicQuery, useGetPracticeQuestionsQuery } from "../services/practiceQuestionsApi";
import { RootState } from "../../../shared/store/store";

const PracticeQuestions: React.FC = () => {
  // const {topicId} = useSelector((state: RootState) => state.api.);
  // const topicId = "00000000-0000-0000-0000-000000000001";
  // const { data, isLoading, error } = useGetPracticeQuestionsByCategoryQuery(topicId);

  const { data, isLoading, error } = useGetPracticeQuestionsQuery();

  if (isLoading) return <div className="text-center mt-8 text-gray-500">טוען שאלות...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">שגיאה בטעינת שאלות.</div>;
  if (!data || data.length === 0) return <div className="text-center mt-8 text-gray-400">לא נמצאו שאלות.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-[--color-primary]">שאלות תרגול</h2>
      <ul className="space-y-4">
        {data.map((q) => (
          <li key={q.id} className="bg-white border border-[--color-border] shadow-md rounded-2xl p-4 transition hover:shadow-lg">
            <div className="text-sm text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">סוג:</span> {q.type}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">רמת קושי:</span> {q.difficulty}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">שאלה:</span> {q.content}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">נוצר על ידי AI:</span> {q.generated_by_ai ? "כן" : "לא"}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">נוצר בתאריך:</span> {new Date(q.created_at).toLocaleString("he-IL")}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">נושאים:</span>{" "}
              {q.topics.length > 0
                ? q.topics.map((topic: any) => topic.name).join(", ")
                : "לא סווג"}
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">רמזים:</span>{" "}
              {q.hints.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                  {q.hints.map((hint: any, index: number) => (
                    <li key={index}>{hint.content}</li>
                  ))}
                </ul>
              ) : (
                "אין רמזים"
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeQuestions;
