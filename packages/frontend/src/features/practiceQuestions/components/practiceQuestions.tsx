import React from "react";
import { useGetPracticeQuestionsQuery } from "../services/practiceQuestionsApi";
import { CardSimple } from "../../../shared/ui/card";
import { Grid } from "../../../shared/ui/grid";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { Button } from "../../../shared/ui/button";
import { FiHelpCircle, FiClock, FiCpu, FiCalendar, FiTag, FiZap, FiEdit2, FiTrash2, FiInfo, FiSettings } from "react-icons/fi";
import { EmptyState } from "../../../shared/ui/EmptyState";

const PracticeQuestions: React.FC = () => {
  const { data, isLoading, error } = useGetPracticeQuestionsQuery();

  if (isLoading)
    return <div className="text-center mt-8 text-gray-500">טוען שאלות...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">שגיאה בטעינת שאלות.</div>;
  if (!data || data.length === 0)
    return (
      <EmptyState
        icon={<FiHelpCircle size={28} />}
        title="לא נמצאו שאלות"
        description="אין כרגע שאלות תרגול זמינות להצגה."
      />
    );

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-3xl font-bold text-center text-[--color-primary] mb-8">שאלות תרגול</h2>
      <Grid cols={3}>
        {data.map((q) => (
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