import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, BadgeCheck, LayoutDashboard } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { Paragraph } from "../../../shared/ui/typography";
import { SummaryBox } from "../../../shared/ui/SummaryBox";

const EndSurvey = () => {
  const [showEnd, setShowEnd] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <Button
        variant="primary-dark"
        size="md"
        icon={<Sparkles className="w-5 h-5" />}
        iconPosition="left"
        onClick={() => setShowEnd(true)}
      >
        סיום השאלון
      </Button>

      {showEnd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-right border border-[--color-border] animate-fade-in">
            {/* כפתור סגירה */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4"
              aria-label="סגור"
              onClick={() => setShowEnd(false)}
              iconPosition="left"
              icon={<span className="text-gray-400 hover:text-gray-600 transition">×</span>}
            />

            {/* טקסט חגיגי */}
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Sparkles className="text-yellow-500 w-6 h-6" />
              <span className="text-xl font-bold text-text-main">
                ברכות לרגל סיום השאלון!
              </span>
            </div>


            {/* סיכום קצר (דוגמה) */}
            <SummaryBox
              title="שאלות שענית"
              value="12"
              description="מתוך 12"
              icon={<BadgeCheck />}
              iconColor="success"
              className="mb-4"
            />

            {/* כפתורים */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary-dark"
                size="md"
                icon={<BadgeCheck className="w-5 h-5" />}
                iconPosition="left"
                fullWidth
                onClick={() => navigate("/certificate")}
              >
                הנפקת תעודה
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<LayoutDashboard className="w-5 h-5" />}
                iconPosition="left"
                fullWidth
                onClick={() => navigate("/dashboard")}
              >
                לדשבורד
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndSurvey;