// import { useDeleteInterviewMaterialMutation, useGetInterviewMaterialsQuery } from "../../../shared/api/interviewMaterialApi";
// import { InterviewMaterial } from "../types/InterviewMaterial";
// import { InterviewMaterialListItem } from "./interviewMaterialItem";

// const InterviewMaterialList = () => {
//   const { data: interviewMaterial, error, isLoading } = useGetInterviewMaterialsQuery();
//   const [deleteInterviewMaterial] = useDeleteInterviewMaterialMutation();


//   /**
//    * Handles the deletion of an interview material by its ID.
//    * 
//    * @param {number} id - The unique identifier of the interview material to be deleted.
//    * @throws {Error} If the deletion operation fails, logs the error to the console.
//    */
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteInterviewMaterial(id).unwrap();
//       console.log('interview Material deleted!');
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleUpdate = async (id: number, im: InterviewMaterial) => {
//     try {
//       console.log(`Updated: ${id}`);

//     } catch (err) {
//       console.error('Update failed:', err);
//     }
//   };



//   if (isLoading) return (
//     <div className="flex justify-center items-center h-40">
//       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
//       <span className="ml-4 text-green-700 font-semibold">טוען נתונים...</span>
//     </div>
//   )
//   if (error) return <div>שגיאה בטעינת משאבים לראיון</div>;
//   return (
//     <section dir="rtl" className="mt-6 space-y-4 px-4">
//       <h2 className="text-xl font-bold text-green-700 mb-2 •	text-4xl md:text-5xl">רשימת משאבים</h2>

//       {interviewMaterial && interviewMaterial.length > 0 ? (
//         interviewMaterial.map((res) => (
//           <div
//             key={res.id}
//             className="bg-white border border-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition"          >
//             <InterviewMaterialListItem item={res} onEdit={handleUpdate} onDelete={handleDelete} />
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-sm">אין ען להצגה כרגע.</p>
//       )}
//     </section>
//   );
// };

// export default InterviewMaterialList;
import { InterviewMaterials } from "../types/InterviewMaterials";

interface InterviewMaterialListItemProps {
  item: InterviewMaterials;
  onEdit: (item: InterviewMaterials) => void;
  onDelete: (id: string) => void;
}

export const InterviewMaterialListItem = ({
  item,
  onEdit,
  onDelete,
}: InterviewMaterialListItemProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-right">
      {/* תוכן הטקסטי */}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-bold text-text-main">{item.title}</h3>
        {item.short_description && (
          <p className="text-sm text-gray-500">{item.short_description}</p>
        )}
        {/* תצוגת קישור לקובץ אם יש */}
        {item.file_url && (
          <a
            href={item.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            צפייה בקובץ
          </a>
        )}
      </div>

      {/* כפתורי עריכה ומחיקה */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(item)}
          className="border border-blue-600 text-blue-600 px-4 py-1.5 text-sm rounded-lg hover:bg-blue-50 transition"
        >
          עריכה
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="border border-red-600 text-red-600 px-4 py-1.5 text-sm rounded-lg hover:bg-red-50 transition"
        >
          מחיקה
        </button>
      </div>
    </div>
  );
};
