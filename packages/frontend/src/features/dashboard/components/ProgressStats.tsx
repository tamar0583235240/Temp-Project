import React from 'react';
import { useGetProgressStatsQuery } from '../../../shared/api/api';
import { CheckCircle } from 'lucide-react';
import { useUserStore } from '../store/progressSlice';

const ProgressStats: React.FC = () => {
  // אם אין userId בסטור, נשתמש במחרוזת ברירת מחדל
  const userId = useUserStore((state) => state.userId) || "1d2dd74e-fdd4-4cb3-90da-0ce7ff08248c";

  // לא מדלגים על הקריאה ל־API גם כשיש ברירת מחדל
  const { data, isLoading, isError } = useGetProgressStatsQuery(userId, {
    skip: false,
  });

  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה בטעינת נתונים</p>;

  const total = data?.totalQuestions ?? 0;
  const answered = data?.answeredQuestions ?? 0;
  const percentage = total ? (answered / total) * 100 : 0;

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 max-w-sm mx-auto flex flex-col gap-4 items-center"
      style={{ direction: 'rtl', textAlign: 'center' }}
    >
      <div className="flex items-center justify-center gap-2">
        <CheckCircle className="text-gray-700 w-5 h-5" />
        <span className="text-lg font-semibold">התקדמות כללית</span>
      </div>

      <div className="text-3xl font-bold text-black">
        {answered}/{total}
      </div>

      <div className="text-sm text-gray-500 -mt-2">שאלות שהושלמו</div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressStats;
