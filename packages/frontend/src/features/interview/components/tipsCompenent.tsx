import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';
import './tipsComponent.css';

export const TipsComponent: React.FC = () => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion?.tips) return null;

  return (
    <div className="tip-modern-box">
      <div className="tip-modern-title">💡 טיפ לתשובה</div>
      <div className="tip-modern-content">{currentQuestion.tips}</div>
    </div>
  );
};
