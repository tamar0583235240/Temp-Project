import { useState, useEffect } from 'react';
import axios from 'axios';
import  './SmileRating.css'; // Assuming you have a CSS file for styles

type Props = {
  aiInsightId: string;
};

const smileEmojis = ['😄', '🙂', '😐', '🙁', '😞'];

export default function SmileRating({ aiInsightId }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [bouncing, setBouncing] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // האם הקופסה קיימת ב־DOM
  const [isFadingOut, setIsFadingOut] = useState(false); // אנימציית יציאה
  const [showUndoButton, setShowUndoButton] = useState(false);

  // העלמת כפתור הביטול אחרי 5 שניות
  useEffect(() => {
    if (showUndoButton) {
      const timer = setTimeout(() => {
        setShowUndoButton(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndoButton]);

  const handleClick = async (index: number) => {
    setSelected(index);
    setBouncing(index);
    setTimeout(() => setBouncing(null), 600);

    try {
      await axios.post('/api/ai-insight/rate', {
        aiInsightId,
        rating: index + 1,
      });
      setSubmitted(true);

      // הפעלת אנימציית יציאה
      setIsFadingOut(true);

      // לאחר זמן האנימציה — הסתרה מהמסך + כפתור ביטול
      setTimeout(() => {
        setIsVisible(false);
        setShowUndoButton(true);
      }, 500); // תואם לאורך האנימציה
    } catch (err) {
      console.error('שגיאה בשליחת דירוג:', err);
    }
  };

  const handleUndo = () => {
    setSelected(null);
    setSubmitted(false);
    setIsVisible(true);
    setIsFadingOut(false);
    setShowUndoButton(false);
  };

  return (
    <>
      {isVisible && (
        <div
          dir="rtl"
          className={`text-right bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-3 transition-all duration-500
          ${isFadingOut ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
          `}
        >
          <h2 className="text-lg font-bold text-gray-800">
            כמה אתה מרוצה מהניתוח של ה־AI?
          </h2>

          <div className="flex justify-between items-center">
            {smileEmojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className={`text-3xl transition-all duration-150 ease-in-out
                  ${selected === i ? 'scale-125' : 'opacity-60 hover:opacity-100'}
                  ${bouncing === i ? 'animate-bounce' : ''}
                `}
              >
                {emoji}
              </button>
            ))}
          </div>

          {submitted && (
            <p className="text-green-600 text-sm">תודה על המשוב!</p>
          )}
        </div>
      )}

      {showUndoButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleUndo}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg transition"
          >
            בטל דירוג
          </button>
        </div>
      )}
    </>
  );
}
