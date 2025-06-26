
export type ProgressData = {
  total: number;
  completed: number;
};

interface ProgressStatsProps {
  pd: ProgressData | null;
}

export const ProgressStats = ({ pd }: ProgressStatsProps) => {
  if (!pd) return <div className="p-4 text-center">Loading...</div>;

  const percent = ((pd.completed / pd.total) * 100).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center font-sans">
      {/* כותרת */}
      <h2 className="text-lg font-semibold mb-2 text-gray-700">התקדמות</h2>
      
      {/* אחוזים */}
      <div className="text-4xl font-bold mb-4 text-gray-900">{percent}%</div>
      
      {/* מסגרת פס ההתקדמות */}
      <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner mb-4 relative overflow-hidden">
        {/* חלק ההתקדמות */}
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${parseFloat(percent)}%` }}
        ></div>
      </div>
      
      {/* טקסט תיאור */}
      <div className="text-sm text-gray-600">
        {pd.completed} מתוך {pd.total} הושלמו
      </div>
    </div>
  );
};