import React from "react";
import { useGetPracticeQuestionsQuery } from "../services/practiceQuestionsApi";
import { CardSimple } from "../../../shared/ui/card";
import { Grid } from "../../../shared/ui/grid";
import { Button } from "../../../shared/ui/button";
import { FiHelpCircle, FiCpu, FiCalendar, FiTag, FiZap, FiEdit2, FiTrash2, FiInfo, FiSettings } from "react-icons/fi";
import { EmptyState } from "../../../shared/ui/EmptyState";

interface FiltersState {
  topicId: string;
  difficulty: string;
  type: string;
  generatedByAi: boolean;
  search: string;
}

interface PracticeQuestionsProps {
  filters: FiltersState;
}

const PracticeQuestions: React.FC<PracticeQuestionsProps> = ({ filters }) => {
  const { data, isLoading, error } = useGetPracticeQuestionsQuery();

  // סינון השאלות בהתאם לפילטרים מהפרופס
  const filteredQuestions = data?.filter((q) => {
    if (filters.topicId && !q.topics.some((t: any) => t.id === filters.topicId)) {
      return false;
    }
    if (filters.difficulty && q.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.type && q.type !== filters.type) {
      return false;
    }
    if (filters.generatedByAi && !q.generated_by_ai) {
      return false;
    }
    if (filters.search && !q.content.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (isLoading)
    return <div className="text-center mt-8 text-gray-500">טוען שאלות...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">שגיאה בטעינת שאלות.</div>;
  if (!filteredQuestions || filteredQuestions.length === 0)
    return (
      <EmptyState
        icon={<FiHelpCircle size={28} />}
        title="לא נמצאו שאלות"
        description="אין שאלות העונות על הסינון."
      />
    );

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-3xl font-bold text-center text-[--color-primary] mb-8">שאלות תרגול</h2>
      <Grid cols={3}>
        {filteredQuestions.map((q) => (
          <CardSimple
            key={q.id}
            className="flex flex-col justify-between border border-[--color-border] p-5 rounded-2xl shadow-md hover:shadow-lg transition min-h-[520px]"
          >
            <div className="grid gap-3 text-left flex-1">
              <div className="min-h-[56px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiTag className="text-text-secondary" /> סוג שאלה
                </p>
                <p className="text-sm text-text-secondary">{q.type}</p>
              </div>

              <div className="min-h-[56px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiZap className="text-text-secondary" /> רמת קושי
                </p>
                <p className="text-sm text-text-secondary">{q.difficulty}</p>
              </div>

              <div className="min-h-[80px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiCpu className="text-text-secondary" /> שאלה
                </p>
                <p className="text-sm text-text-secondary">{q.content}</p>
              </div>

              <div className="min-h-[56px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiSettings className="text-text-secondary" /> נוצר על ידי AI
                </p>
                <p className="text-sm text-text-secondary">{q.generated_by_ai ? "כן" : "לא"}</p>
              </div>

              <div className="min-h-[56px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiCalendar className="text-text-secondary" /> תאריך יצירה
                </p>
                <p className="text-sm text-text-secondary">
                  {new Date(q.created_at).toLocaleDateString("he-IL")}
                </p>
              </div>

              <div className="min-h-[56px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiTag className="text-text-secondary" /> נושאים
                </p>
                <p className="text-sm text-text-secondary">
                  {q.topics.length > 0 ? q.topics.map((t: any) => t.name).join(", ") : "לא סווג"}
                </p>
              </div>

              <div className="min-h-[80px]">
                <p className="text-sm font-semibold text-text-main mb-1 flex items-center gap-1">
                  <FiInfo className="text-text-secondary" /> רמזים
                </p>
                {q.hints.length > 0 ? (
                  <ul className="list-disc list-inside ml-4 text-sm text-text-secondary">
                    {q.hints.map((hint: any, index: number) => (
                      <li key={index}>{hint.content}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-text-secondary">אין רמזים</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[--color-border] mt-auto">
              <Button variant="ghost" size="sm" icon={<FiEdit2 />} aria-label="עריכה" />
              <Button variant="ghost" size="sm" icon={<FiTrash2 />} aria-label="מחיקה" />
            </div>
          </CardSimple>
        ))}
      </Grid>
    </div>
  );
};

export default PracticeQuestions;
