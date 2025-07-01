import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  // ודאי שזה השם המדויק שנוצר ב‑AnswerApi
  useGetQuestionsStatsByUserIdQuery,
} from "../features/recordings/services/answerApi";
import { Stats } from "../features/recordings/types/Stats";

interface QuestionsChartProps {
  userId: string; // מזהה המשתמש שעליו מציגים את הסטטיסטיקה
}

const COLORS = ["#007bff", "#FF8042"]; // כחול וכתום

const QuestionsChart: React.FC = () => {
  // קריאת הנתונים מהשרת
  const {
    data: stats,
    isLoading,
    isError,
  } = useGetQuestionsStatsByUserIdQuery();

  // טיפול במצבי טעינה / שגיאה
  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError || !stats) return <p>לא ניתן לטעון סטטיסטיקה.</p>;

  // בניית מערך data לגרף
  const chartData = [
    { name: "נענו", value: stats.answered },
    { name: "לא נענו", value: stats.unanswered },
  ];

  return (
    <div
      dir="rtl"
      style={{ width: "100%", maxWidth: 400, height: 300, margin: "0 auto" }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionsChart;
