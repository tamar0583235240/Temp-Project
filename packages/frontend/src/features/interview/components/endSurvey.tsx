import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, BadgeCheck, LayoutDashboard, X } from "lucide-react";

const EndSurvey = () => {
  const [showEnd, setShowEnd] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <button
        className="text-primary-dark underline font-semibold flex items-center gap-2 hover:text-primary"
        onClick={() => setShowEnd(true)}
      >
        <Sparkles className="w-5 h-5" />
        סיום השאלון
      </button>

      {showEnd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-right border border-[--color-border] animate-fade-in">
            {/* כפתור סגירה */}
            <button
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setShowEnd(false)}
              aria-label="סגור"
            >
              <X className="w-6 h-6" />
            </button>

            {/* טקסט חגיגי */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-500 w-6 h-6" />
              <p className="text-xl font-bold text-text-main">
                ברכות לרגל סיום השאלון!
              </p>
            </div>

            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              כל הכבוד על ההשקעה. עכשיו תוכל להפיק תעודה או לחזור לדשבורד.
            </p>

            {/* כפתורים */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition"
                onClick={() => navigate("/certificate")}
              >
                <BadgeCheck className="w-5 h-5" />
                הנפקת תעודה
              </button>

              <button
                className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white px-4 py-2 rounded-xl font-semibold transition"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard className="w-5 h-5" />
                לדשבורד
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndSurvey;
