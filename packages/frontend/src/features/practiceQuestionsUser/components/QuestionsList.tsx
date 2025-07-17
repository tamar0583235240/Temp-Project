import { SetStateAction, useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { QuestionStatus } from "./QuestionStatus";
import { AnswerModal } from "./AnswerModel";
import { LikeDislike } from "./LikeDislike";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";

interface Question {
  id: string;
  content: string;
  difficulty: string;
  type: string;
}

interface Props {
  topicName: string;
  level: string;
  type: string;
}

export const QuestionsList = ({ topicName, level, type }: Props) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, string>>({});
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "easy":
        return "קל";
      case "medium":
        return "בינוני";
      case "hard":
        return "קשה";
      default:
        return level;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "code":
        return "קוד";
      case "free_text":
        return "טקסט חופשי";
      case "yes_no":
        return "כן / לא";
      default:
        return type;
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (topicName) queryParams.append("topic", topicName);
        if (level) queryParams.append("level", level);
        if (type) queryParams.append("type", type);

        const res = await fetch(`http://localhost:5000/api/codeQuestions/questions?${queryParams.toString()}`);
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("שגיאה בשליפת שאלות:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicName, level, type]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setQuestionStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  return (
    <div dir="rtl" className="mt-6">
      {loading ? (
        <p>טוען שאלות...</p>
      ) : questions.length === 0 ? (
        <p>לא נמצאו שאלות תואמות.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li
              key={q.id}
              className="border rounded p-4 shadow text-right bg-white space-y-3"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <p className="text-lg font-semibold text-[--color-primary-dark]">{q.content}</p>
                  <p className="text-sm text-gray-600">
                    רמת קושי: <span className="font-bold">{getDifficultyLabel(q.difficulty)}</span> | אופן המענה:{" "}
                    <span className="font-bold">{getTypeLabel(q.type)}</span>
                  </p>

                  <QuestionStatus
                    value={(questionStatuses[q.id] as any) ?? "not_started"}
                    onChange={(val) => handleStatusChange(q.id, val)}
                  />

                  {/* ✅ הוספת קומפוננטת הלייקים עם questionId ו-userId */}
                  {userId && (
                    <LikeDislike questionId={q.id} userId={userId} />
                  )}
                </div>

                <button
                  onClick={() => setSelectedQuestion(q)}
                  className="group flex-shrink-0 flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-dark] active:scale-95 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-transform duration-200 shadow-sm"
                >
                  <FiEdit3 className="text-base transform transition-transform duration-200 group-hover:translate-x-1" />
                  התשובה שלך
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedQuestion && (
        <AnswerModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onSubmit={(answer) => {
            console.log("תשובה:", answer);
            // כאן אפשר לקרוא ל-API ששומר תשובה בבקאנד
          }}
        />
      )}
    </div>
  );
};
