import { useState } from "react";
import { useDeleteInterviewMaterialMutation, useGetInterviewMaterialsQuery } from "../../../shared/api/interviewMaterialApi";
import { InterviewMaterial } from "../types/InterviewMaterial";
import { InterviewMaterialListItem } from "./interviewMaterialItem";


const InterviewMaterialList = () => {
  const { data: interviewMaterial=[], error, isLoading } = useGetInterviewMaterialsQuery();
  const [deleteInterviewMaterial] = useDeleteInterviewMaterialMutation();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);


  /**
   * Handles the deletion of an interview material by its ID.
   * 
   * @param {number} id - The unique identifier of the interview material to be deleted.
   * @throws {Error} If the deletion operation fails, logs the error to the console.
   */
  const handleDelete = async (id: number) => {
    try {
      await deleteInterviewMaterial(id).unwrap();
      console.log('interview Material deleted!');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (id: number, im: InterviewMaterial) => {
    try {
      console.log(`Updated: ${id}`);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };



  if (isLoading) return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
      <span className="ml-4 text-green-700 font-semibold">טוען נתונים...</span>
    </div>
  )
  if (error) return <div>שגיאה בטעינת משאבים לראיון</div>;
  return (
    <section dir="rtl" className="mt-6 space-y-4 px-4">
      <h2 className="text-xl font-bold text-green-700 mb-2 •	text-4xl md:text-5xl">רשימת משאבים</h2>

      {interviewMaterial && interviewMaterial.length > 0 ? (
        interviewMaterial.map((res) => (
          <div
            key={res.id}
            className="bg-white border border-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition"          >
            <InterviewMaterialListItem item={res} onEdit={handleUpdate} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">אין תוכן להצגה כרגע.</p>
      )}
    </section>
  );
};

export default InterviewMaterialList;
