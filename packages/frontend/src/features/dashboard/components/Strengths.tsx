
import { useGetAIInsightsQuery } from "../store/aiInsightApi";
import { Lightbulb, CheckCircle } from "lucide-react";

export const SummaryStrengths = () => {
  const { data, error, isLoading } = useGetAIInsightsQuery();

  if (isLoading) return <div className="text-center text-blue-500 text-lg">טוען  נקודות חוזקה...</div>;
  if (!data || data.length === 0) return <div className="text-center text-gray-600">לא נמצאו נקודות חוזקה.</div>;
  if (error) return <div className="text-center text-red-500 text-lg">אירעה שגיאה בעת שליפת הנתונים</div>;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto flex flex-col gap-4" dir="rtl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h2 className="text-lg font-semibold text-primary-text">הנקודות חוזקה  מה-AI</h2>
      </div>

      {data?.map(item => (
        <div key={item.id} className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-gray-50 hover:shadow-md transition">
          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
          <p className="text-gray-800 leading-relaxed text-sm">{item.strengths}</p>
        </div>
      ))}
    </div>
  );
};
