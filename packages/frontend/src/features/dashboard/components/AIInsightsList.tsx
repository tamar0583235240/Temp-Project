import React from 'react';
import { useGetItemsQuery } from '../services/aiInsightsApi';
import { aiInsightsType } from '../types/aiInsightsType';
import { useUserStore } from '../store/progressSlice';
import { useGetProgressStatsQuery } from '../../../shared/api/api';
import { CheckCircle } from 'lucide-react';

const AIInsightsList: React.FC = () => {
  const { data: insights = [] } = useGetItemsQuery();
  const userId = useUserStore(state => state.userId) || '9f4572ec-25fd-43d0-a0c2-4d86bd84e9f6';

  const { isLoading, isError } = useGetProgressStatsQuery(userId, { skip: !userId });

  if (isLoading) return <p className="text-center text-blue-500 text-lg">טוען... אנא המתן...</p>;
  if (isError) return <p className="text-center text-red-500 text-lg">אירעה שגיאה בשליפה.</p>;
  if (insights.length === 0) return <p className="text-center text-gray-600">לא נמצאו מסקנות.</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto flex flex-col gap-4" dir="rtl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <CheckCircle className="text-emerald-500 w-5 h-5" />
        <h2 className="text-lg font-semibold text-primary-text">מסקנות AI</h2>
      </div>

      <ul className="list-disc list-inside text-gray-800 text-sm space-y-2">
        {insights.map((insight: aiInsightsType) => (
          <li key={insight.id} className="leading-relaxed">{insight.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsightsList;
