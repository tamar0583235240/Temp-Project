import { useFeedbackAnalysis } from "../hooks/useFeedbackAnalysis";
import FeedbackDisplay from "./FeedbackDisplay";
import MagicLoader from "./MagicLoader";


const AnswerAI = ({ answerId }: { answerId: string }) => {
  const { analysis, loading, error } = useFeedbackAnalysis(answerId);

  if (loading) return <MagicLoader />;  // <-- כאן מציגים טעינה

  if (error) return (
    <p className="text-red-600 text-center p-4 rounded-xl bg-red-100 border border-red-300 mt-4">
      אירעה שגיאה בעת ניתוח התשובה.
    </p>
  );

  if (!analysis) return (
    <p className="text-gray-600 text-center p-4 mt-4">
      לא התקבלה תוצאה מה־AI.
    </p>
  );

  return (
    <div className="min-h-[180px] p-6 bg-white w-full rounded-2xl shadow-md mt-4">
      <FeedbackDisplay analysis={analysis} />
    </div>
  );
};


export default AnswerAI;
