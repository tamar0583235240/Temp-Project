import { Provider } from 'react-redux';
import { store } from '../../../shared/store/store';
import AIInsightsList from './AIInsightsList';
import ProgressStats from './ProgressStats';
import { useUserStore } from '../store/progressSlice';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { SummaryStrengths } from './Strengths';
import { ImprovementSuggestions2 } from './ImprovementSuggestions2';

export const MainDashbord = () => {
  const userId = useUserStore((state) => state.userId) || "ba24bf25-e017-46bf-a8ca-a4d27a2bc7af";

  // כרגע ImprovementSuggestions מצפה ל־fullName ולא ל־userId
  // אפשר פשוט להעביר את userId כשם זמני
  const fullName = userId; // או לשנות ל-"ישראל ישראלי" או שם אמיתי

  return (
    <Provider store={store}>
      <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
        <ImprovementSuggestions fullName={fullName} />
        <SummaryStrengths />
        <ImprovementSuggestions2 />
        <AIInsightsList />
        <ProgressStats />
      </div>
    </Provider>
  );
};
