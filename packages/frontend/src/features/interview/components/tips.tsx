import React, { useEffect, useState } from "react";
import { useGetTipsQuery } from '../services/tipsApi'; // ודאי שהנתיב נכון

export const TipsComponent: React.FC = () => {
  const { data: tips, isLoading, error } = useGetTipsQuery();
  const [remainingTips, setRemainingTips] = useState<string[]>([]);
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [enabled, setEnabled] = useState(true);

  // כאשר מתקבלים טיפים מהשרת, אתחלי את הרשימה
  useEffect(() => {
    if (tips) {
      setRemainingTips(tips.map(t => t.content));
    }
  }, [tips]);

  useEffect(() => {
    if (!enabled || remainingTips.length === 0) return;

    const interval = setInterval(() => {
      if (!enabled || remainingTips.length === 0) return;

      const randomIndex = Math.floor(Math.random() * remainingTips.length);
      const tip = remainingTips[randomIndex];

      setCurrentTip(tip);
      setHidden(false);

      const updated = remainingTips.filter((_, i) => i !== randomIndex);
      setRemainingTips(updated);
    }, 1500);

    return () => clearInterval(interval);
  }, [remainingTips, enabled]);

  if (isLoading) return <div>טוען טיפים...</div>;
  if (error) return <div>שגיאה בטעינת טיפים</div>;

  return (
    <>
      {/* 💡 פופאפ */}
      {!hidden && currentTip && enabled && (
        <div style={popupContainerStyle}>
          <div style={popupStyle}>
            <button onClick={() => setHidden(true)} style={closeButtonStyle}>×</button>
            <p style={textStyle}>💡 {currentTip}</p>
          </div>
        </div>
      )}

      {/* 🎛️ כפתור שליטה – תמיד גלוי */}
      <div style={controlsContainerStyle}>
        <button onClick={() => setEnabled(!enabled)} style={buttonStyle}>
          {enabled ? "🔕 כבה טיפים" : "🔔 הדלק טיפים"}
        </button>
      </div>
    </>
  );
};

// 🎨 עיצוב (כמו שהיה)
const popupContainerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "100px",
  right: "20px",
  zIndex: 9999,
};

const popupStyle: React.CSSProperties = {
  backgroundColor: "#f0f8ff",
  border: "1px solid #90caf9",
  borderRadius: "12px",
  padding: "16px",
  minWidth: "260px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  position: "relative",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#1565c0",
  margin: "0 0 12px 0",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "6px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "20px",
  color: "#777",
  cursor: "pointer",
};

const controlsContainerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#e3f2fd",
  border: "1px solid #64b5f6",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  fontSize: "14px",
};