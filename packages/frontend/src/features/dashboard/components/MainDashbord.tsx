import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../shared/store/store';
import AIInsightsList from './AIInsightsList';
import ProgressStats from './ProgressStats';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { SummaryStrengths } from './Strengths';
import { ImprovementSuggestions2 } from './ImprovementSuggestions2';

const MainDashboard = () => {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
};

const DashboardContent = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <ImprovementSuggestions />
      <SummaryStrengths />
      <ImprovementSuggestions2 />
      <AIInsightsList />
      <ProgressStats />
    </div>
  );
};

export default MainDashboard;