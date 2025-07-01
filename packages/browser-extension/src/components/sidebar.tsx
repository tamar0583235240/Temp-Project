// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../shared/store/store';
// import { Lightbulb } from 'lucide-react';
// import { CardSimple } from '../../../shared/ui/card';
// const TipsComponent: React.FC = () => {
//   const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
//   const currentQuestion = questions[currentIndex];
//   if (!currentQuestion?.tips) return null;
//   return (
//     <CardSimple className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md p-8 w-[520px] min-h-[120px] flex flex-col gap-4 mx-auto">
//       <div className="flex items-center justify-end gap-2 mb-3">
//         <span className="font-bold text-lg text-gray-800">טיפים לתשובה</span>
//         <Lightbulb className="w-6 h-6 text-yellow-400" />
//       </div>
//       <div className="bg-sky-100 rounded-xl px-6 py-8 text-base text-[#1B3A4B] text-right leading-relaxed flex-1 flex items-start justify-end min-h-[64px]">
//         <span className="text-right w-full">{currentQuestion.tips}</span>
//       </div>
//     </CardSimple>
//   );
// };
// export default TipsComponent;