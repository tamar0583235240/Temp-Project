import { useFeedbackAnalysis } from "../hooks/useFeedbackAnalysis";
import FeedbackDisplay from "./FeedbackDisplay";

const DEMO_ANALYSIS = {
  score: 5,
  summary: "מענה מצוין! ענית בצורה מקצועית וברורה.",
  positives: ["הצגת מחקר מעמיק", "הדגשת ערכים", "ניסוח רהוט"],
  improvements: ["להוסיף דוגמה אישית", "להדגיש תרומה ייחודית"],
  aiComment: "המשך כך!",
};

const AnswerAI = ({ answerId }: { answerId: string }) => {
  // const { analysis, loading } = useFeedbackAnalysis(answerId);
  // דמו בלבד:
  const analysis = DEMO_ANALYSIS;
  const loading = false;

  return (
    <div className="min-h-[180px] p-6 bg-white w-full rounded-2xl shadow-md">
      {/* {loading ? (
        <MagicLoader />
      ) : analysis ? ( */}
      {analysis ? (
        <FeedbackDisplay analysis={analysis} />
      ) : (
        <p className="text-red-500 text-center">לא התקבלה תוצאה.</p>
      )}
    </div>
  );
};

export default AnswerAI;
