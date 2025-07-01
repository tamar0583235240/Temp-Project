import { Provider } from 'react-redux';
import { store } from '../../../shared/store/store';
import AIInsightsList from './AIInsightsList';
import ProgressStats from './ProgressStats';
import { useUserStore } from '../store/progressSlice';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { SummaryStrengths } from './Strengths';
import { ImprovementSuggestions2 } from './ImprovementSuggestions2';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../shared/store/store'

export const MainDashbord = () => {


  const userName = useSelector((state: RootState) => state.auth?.user?.firstName !);

  return (
    <Provider store={store}>
      <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
        <ImprovementSuggestions fullName={userName} />
        <SummaryStrengths />
        <ImprovementSuggestions2 />
        <AIInsightsList />
        <ProgressStats />
      </div>
    </Provider>
  );
};
