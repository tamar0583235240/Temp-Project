// // src/components/Status.tsx
// import React from "react";
// import { useGetStatusByUserIdQuery } from "../services/statusService";

// interface Props {
//   userId: string;
// }

// const Status: React.FC<Props> = ({ userId }) => {
// //   const { data, isLoading, isError } = useGetStatusByUserIdQuery();

//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (isError) return <p>שגיאה בשליפת הנתונים</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">סטטוס שאלות</h2>
//       {data && data.length > 0 ? (
//         <ul className="list-disc pl-5">
//           {data.map((status, index) => (
//             <li key={index}>
//               שאלה {index + 1}: {status.answered ? "נענתה ✅" : "לא נענתה ❌"}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>אין מידע להצגה.</p>
//       )}
//     </div>
//   );
// };

// export default Status;
