import { useGetAIInsightsQuery } from "../store/aiInsightApi";
import { Lightbulb, CheckCircle } from "lucide-react";

export const ImprovementSuggestions = () => {
  const { data, error, isLoading } = useGetAIInsightsQuery();

  if (isLoading) {
    return <div className="text-center text-blue-500 text-lg">טוען הצעות לשיפור...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">אירעה שגיאה בעת שליפת הנתונים</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
        הצעות לשיפור מה-AI
        <Lightbulb className="w-6 h-6 text-yellow-500" />
      </h2>
      <div className="space-y-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <p className="text-gray-800 leading-relaxed text-right">
              {item.improvements}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
