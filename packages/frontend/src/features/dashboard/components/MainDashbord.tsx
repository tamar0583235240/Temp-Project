import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../shared/store/store';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import AIInsightsList from './AIInsightsList';
import ProgressStats from './ProgressStats'
export const MainDashbord  = () => {
  return (
    <Provider store={store}>
      <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
        <ImprovementSuggestions />
        <AIInsightsList />
                <ProgressStats /> {/* בלי userId */}

      </div>
    </Provider>
  );
};
