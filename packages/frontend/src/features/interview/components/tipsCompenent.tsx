import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';
import './tipsComponent.css';

export const TipsComponent: React.FC = () => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion?.tips) return null;

// <<<<<<< HEAD
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
//                     {enabled ? "🔕 כבה טיפים" : "🔔 הפעל טיפים"}
//                 </button>
//             </div>
//         </>
//     );
// =======
  return (
    <div className="tip-modern-box">
      <div className="tip-modern-title">💡 טיפ לתשובה</div>
      <div className="tip-modern-content">{currentQuestion.tips}</div>
    </div>
  );
};
