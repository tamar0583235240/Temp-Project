import React from "react";
import { useGetPracticeQuestionsQuery } from "../services/practiceQuestionsApi";

const PracticeQuestions: React.FC = () => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeQuestions;
