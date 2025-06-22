// import React, { useEffect, useState } from "react";
// import { useGetTipsQuery } from '../services/tipsApi';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../shared/store/store';
// import { addShownTip, resetShownTips } from "../store/tipsSlice";
// import { Tip } from '../types/tip';
// import {
//     popupContainerStyle, popupStyle, textStyle, closeButtonStyle,
//     controlsContainerStyle, buttonStyle, loaderContainerStyle, spinnerStyle,
// } from './tipsStyles';

// export const TipsComponent: React.FC = () => {
//     const dispatch = useDispatch();
//     const shownTips = useSelector((state: RootState) => state.shownTips.shownTips);
//     const { data: tips, isLoading, error } = useGetTipsQuery();

//     const [remainingTips, setRemainingTips] = useState<Tip[]>([]);
//     const [currentTip, setCurrentTip] = useState<Tip | null>(null);
//     const [hidden, setHidden] = useState(false);
//     const [enabled, setEnabled] = useState(true);

//     const shuffleArray = <T,>(array: T[]): T[] => {
//         const shuffled = [...array];
//         for (let i = shuffled.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//         }
//         return shuffled;
//     };

//     useEffect(() => {
//         if (tips) {
//             const unseen = tips.filter(t => !shownTips.includes(t.id));
//             setRemainingTips(shuffleArray(unseen));
//         }
//     }, [tips, shownTips]);

//     useEffect(() => {
//         if (enabled && remainingTips.length === 0 && tips && tips.length > 0) {
//             dispatch(resetShownTips());
//             setTimeout(() => {
//                 setRemainingTips(shuffleArray(tips));
//             }, 500);
//         }
//     }, [remainingTips, enabled, tips, dispatch]);

//     useEffect(() => {
//         if (!enabled || remainingTips.length === 0) return;

//         const interval = setInterval(() => {
//             const [nextTip, ...rest] = remainingTips;
//             setCurrentTip(nextTip);
//             dispatch(addShownTip(nextTip.id));
//             setRemainingTips(rest);
//             setHidden(false);
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [remainingTips, enabled, dispatch]);

//     if (isLoading) {
//         return (
//             <div style={loaderContainerStyle}>
//                 <div style={spinnerStyle}></div>
//                 <p style={{ color: "#1565c0", marginTop: "8px" }}>טוען טיפים...</p>
//             </div>
//         );
//     } if (error) return <div>שגיאה בטעינת טיפים</div>;

//     return (
//         <>
//             {!hidden && currentTip && enabled && (
//                 <div style={popupContainerStyle}>
//                     <div style={popupStyle}>
//                         <button onClick={() => setHidden(true)} style={closeButtonStyle}>×</button>
//                         <p style={textStyle}>💡 {currentTip.content}</p>
//                     </div>
//                 </div>
//             )}

//             <div style={controlsContainerStyle}>
//                 <button onClick={() => setEnabled(!enabled)} style={buttonStyle}>
//                     {enabled ? "🔕 כבה טיפים" : "🔔 הדלק טיפים"}
//                 </button>
//             </div>
//         </>
//     );
// };
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';

export const TipsComponent: React.FC = () => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion?.tips) return null;

  return (
    <div style={tipBoxStyle}>
      💡 {currentQuestion.tips}
    </div>
  );
};

const tipBoxStyle: React.CSSProperties = {
  backgroundColor: '#f0f8ff',
  border: '1px solid #90caf9',
  borderRadius: '12px',
  padding: '12px',
  color: '#1565c0',
  fontSize: '15px',
  margin: '16px 0',
};
