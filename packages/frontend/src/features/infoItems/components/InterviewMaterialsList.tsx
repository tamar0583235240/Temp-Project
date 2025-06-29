import React, { useState } from "react";
import {
  useGetInterviewMaterialsQuery,
  useDeleteInterviewMaterialMutation,
} from "../services/interviewMaterialsApi";
import MessageModal from "../../../shared/ui/messageModal";

export const InterviewMaterialsList = () => {
  const { data: items, error, isLoading } = useGetInterviewMaterialsQuery();
  const [deleteMaterial] = useDeleteInterviewMaterialMutation();

  // ניהול ID של פריט שממתין לאישור מחיקה
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  if (isLoading)
    return (
      <p className="text-center py-8 text-lg text-gray-500" dir="rtl">
        טוען...
      </p>
    );
  if (error)
    return (
      <p
        className="text-center py-8 text-lg text-red-600 font-semibold"
        dir="rtl"
      >
        שגיאה בטעינת המדריכים.
      </p>
    );

  const handleDeleteClick = (id: string) => {
    setConfirmingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!confirmingId) return;
    try {
      await deleteMaterial(confirmingId).unwrap();
      setConfirmingId(null);
    } catch (e) {
      console.error("Failed to delete:", e);
      setConfirmingId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmingId(null);
  };

  return (
    <>
      <ul className="space-y-8 max-w-4xl mx-auto p-4" dir="rtl">
        {items?.map((item) => (
          <li
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* תמונה ממוזערת בצד ימין */}
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt="תמונה ממוזערת"
                className="w-24 h-24 object-cover rounded-md border border-gray-300 flex-shrink-0"
              />
            )}

            {/* תוכן טקסט באמצע */}
            <div className="flex-1 space-y-3 text-right">
              <h3 className="text-2xl font-extrabold tracking-wide text-gray-900 uppercase font-serif">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {item.short_description}
              </p>
            </div>

            {/* כפתור הורדה וכפתור מחיקה בצד שמאל */}
            {item.file_url && (
              <div className="md:self-start flex flex-col gap-3 items-start">
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-32 text-center px-5 py-2 bg-primary text-white rounded-xl shadow hover:bg-primary-dark transition duration-200 font-semibold whitespace-nowrap"
                >
                  הורד קובץ
                </a>

                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="w-32 px-5 py-2 bg-red-300 text-white rounded-xl font-semibold hover:bg-red-400 transition whitespace-nowrap"
                >
                  מחק
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* הפופאפ לאישור מחיקה */}
      {confirmingId && (
        <>
          <MessageModal
            title="אישור מחיקה"
            message="בטוחה שברצונך למחוק את הפריט הזה?"
            onClose={handleCancelDelete}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="mt-4 flex justify-end gap-4 max-w-md mx-auto">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                מחק
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                ביטול
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
