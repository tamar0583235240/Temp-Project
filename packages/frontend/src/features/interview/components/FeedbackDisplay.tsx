interface DemoAnalysis {
  score: number;
  summary: string;
  positives: string[];
  improvements: string[];
  aiComment: string;
}

export default function FeedbackDisplay({ analysis }: { analysis: DemoAnalysis }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-xl border max-w-xl mx-auto mt-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">תובנות AI:</h2>
      <div className="mb-2 text-green-600 font-bold text-xl">{analysis.score}/5 ⭐️</div>
      <div className="mb-2 text-gray-700">{analysis.summary}</div>
      <div className="mb-2">
        <span className="font-semibold">נקודות חיוביות:</span>
        <ul className="list-disc pr-5 text-green-700">
          {analysis.positives.map((pos, i) => <li key={i}>{pos}</li>)}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold">שיפורים:</span>
        <ul className="list-disc pr-5 text-blue-700">
          {analysis.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
        </ul>
      </div>
      <div className="mt-2 text-purple-700 font-semibold">{analysis.aiComment}</div>
    </div>
  );
}