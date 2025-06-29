import React from "react";
import { BarChart2 } from "lucide-react"; // אייקון חדש
import { useGetProgressStatsQuery } from "../../../shared/api/api";
import { useUserStore } from "../store/progressSlice";
import { CardWrapper } from "./CardWrapper";

const ProgressStats: React.FC = () => {
  const userId =
    useUserStore((state) => state.userId) ||
    "00000000-0000-0000-0000-000000000000";

  const { data, isLoading, isError } = useGetProgressStatsQuery(userId);

  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה בטעינת נתונים</p>;

  const total = data?.totalQuestions ?? 0;
  const answered = data?.answeredQuestions ?? 0;
  const percentage = total ? (answered / total) * 100 : 0;

  return (
    <CardWrapper
      title="התקדמות כללית"
      icon={<BarChart2 size={24} />}
      className="border-l-4 border-[--color-primary] bg-[--color-background]"
    >
      <div className="space-y-3 text-[--color-text]">
        <div className="font-semibold">
          {answered} / {total} שאלות הושלמו
        </div>

        <div className="w-full h-4 bg-[--color-border] rounded-full overflow-hidden">
          <div
            className="h-full bg-[--color-primary] transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="text-sm text-[--color-secondary-text]">
          הושלמו {percentage.toFixed(1)}% מתוך כלל השאלות
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProgressStats;
