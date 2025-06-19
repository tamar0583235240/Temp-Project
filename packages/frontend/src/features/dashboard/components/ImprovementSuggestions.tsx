// import { useGetAIInsightsQuery } from "../store/aiInsightApi";
// import { Lightbulb, CheckCircle } from "lucide-react";

// export const ImprovementSuggestions = () => {
//   const { data, error, isLoading } = useGetAIInsightsQuery();

//   if (isLoading) {
//     return <div className="text-center text-blue-500 text-lg">טוען הצעות לשיפור...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 text-lg">אירעה שגיאה בעת שליפת הנתונים</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6" dir="rtl">
//       <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
//         הצעות לשיפור מה-AI
//         <Lightbulb className="w-6 h-6 text-yellow-500" />
//       </h2>
//       <div className="space-y-4">
//         {data?.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
//           >
//             <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
//             <p className="text-gray-800 leading-relaxed text-right">
//               {item.improvements}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// import { useGetAIInsightsQuery } from "../store/aiInsightApi";
// import { Lightbulb, CheckCircle } from "lucide-react";

// export const ImprovementSuggestions = () => {
//   const { data, error, isLoading } = useGetAIInsightsQuery();

//   if (isLoading) {
//     return <div className="text-center text-blue-500 text-lg">טוען הצעות לשיפור...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 text-lg">אירעה שגיאה בעת שליפת הנתונים</div>;
//   }

//   return (
//     <div
//       className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto flex flex-col gap-4"
//       style={{ direction: 'rtl', textAlign: 'right' }}
//     >
//       <div className="flex items-center justify-center gap-2 text-center">
//         <Lightbulb className="w-6 h-6 text-yellow-500" />
//         <h2 className="text-lg font-semibold">הצעות לשיפור מה-AI</h2>
//       </div>

//       {data?.map((item) => (
//         <div
//           key={item.id}
//           className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
//         >
//           <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
//           <p className="text-gray-800 leading-relaxed text-sm">
//             {item.improvements}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };
import { useGetAIInsightsQuery } from "../store/aiInsightApi";
import { Lightbulb, CheckCircle } from "lucide-react";

export const ImprovementSuggestions = () => {
  const { data, error, isLoading } = useGetAIInsightsQuery();

  if (isLoading) return <div className="text-center text-blue-500 text-lg">טוען הצעות לשיפור...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">אירעה שגיאה בעת שליפת הנתונים</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto flex flex-col gap-4" dir="rtl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h2 className="text-lg font-semibold text-primary-text">הצעות לשיפור מה-AI</h2>
      </div>

      {data?.map(item => (
        <div key={item.id} className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-gray-50 hover:shadow-md transition">
          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
          <p className="text-gray-800 leading-relaxed text-sm">{item.improvements}</p>
        </div>
      ))}
    </div>
  );
};
