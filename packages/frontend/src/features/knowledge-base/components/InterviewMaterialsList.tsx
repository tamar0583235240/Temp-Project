import React, { useState, useEffect } from "react";
import {
  useGetInterviewMaterialsQuery,
  useDeleteInterviewMaterialMutation,
} from "../../../shared/api/interviewMaterialApi";
import MessageModal from "../../../shared/ui/messageModal";
import { Download, Pencil, Trash2 } from 'lucide-react';
import { InterviewMaterialsItem } from "./interviewMaterialsItem";
import { EditInterviewMaterialsForm } from "./EditInterviewMaterialsForm";
import { InterviewMaterials } from "../types/InterviewMaterials"; // ודא שיש כזה טייפ

export const InterviewMaterialsList = () => {
  const { data: items, error, isLoading } = useGetInterviewMaterialsQuery();
  const [deleteMaterial] = useDeleteInterviewMaterialMutation();

  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<InterviewMaterials | null>(null);

  const handleDeleteClick = (id: string) => {
    setConfirmingId(id);
  };

  const handleCancelDelete = () => {
    setConfirmingId(null);
  };

  const handleConfirmDelete = async () => {
    if (!confirmingId) return;
    try {
      await deleteMaterial(confirmingId).unwrap();
    } catch (e) {
      console.error("Failed to delete:", e);
    } finally {
      setConfirmingId(null);
    }
  };

  const handleEditClick = (id: string) => {
    const item = items?.find((i) => i.id === id) || null;
    setEditingItem(item);
  };

  useEffect(() => {
    document.body.style.overflow = editingItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingItem]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
        <span className="ml-4 text-green-700 font-semibold">טוען ...</span>
      </div>
    );

  if (error)
    return (
      <p className="text-center py-8 text-lg text-red-600 font-semibold" dir="rtl">
        שגיאה בטעינת המשאבים.
      </p>
    );

  return (
    <>
      {items && items.length > 0 ? (
        <ul className="space-y-8 max-w-4xl mx-auto p-4" dir="rtl">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 hover:shadow-lg transition-shadow duration-300"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt="תמונה ממוזערת"
                  className="w-24 h-24 object-cover rounded-md border border-gray-300 flex-shrink-0"
                />
              )}

              <div className="flex-1 space-y-3 text-right max-w-full md:max-w-[60%] break-words whitespace-normal">
                <h3 className="text-2xl font-extrabold tracking-wide text-gray-900 uppercase font-serif">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {item.short_description}
                </p>
              </div>

              <div className="flex gap-3 flex-wrap md:justify-start items-center mt-2">
                {item.file_url && (
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex flex-row px-4 py-2 bg-primary text-white rounded-xl shadow hover:bg-primary-dark transition font-semibold text-sm"
                  >
                    <Download size={16} className="text-white mr-1" />
                    הורד קובץ
                  </a>
                )}

                <button
                  onClick={() => handleEditClick(item.id)}
                  className="flex flex-row px-4 py-2 bg-blue-400 text-white rounded-xl font-semibold hover:bg-blue-500 transition text-sm"
                >
                  <Pencil size={16} className="text-white mr-1" />
                  עדכן
                </button>

                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="flex flex-row px-4 py-2 bg-red-300 text-white rounded-xl font-semibold hover:bg-red-400 transition text-sm"
                >
                  <Trash2 size={16} className="text-white mr-1" />
                  מחק
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm text-center" dir="rtl">אין תוכן להצגה כרגע.</p>
      )}

      {confirmingId && (
        <MessageModal
          title="אישור מחיקה"
          message={
            <div>
              <p>בטוחה שברצונך למחוק את הפריט הזה?</p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
          }
          onClose={handleCancelDelete}
        />
      )}

      {editingItem && (
        <MessageModal
          title="עריכת משאב"
          message={
            <EditInterviewMaterialsForm
              id={editingItem.id}
              defaultValues={{
                title: editingItem.title,
                shortDescription: editingItem.short_description || "",
              }}
              fileUrl={editingItem.file_url}
              thumbnail={editingItem.thumbnail}
              onSuccess={() => setEditingItem(null)}
              onCancel={() => setEditingItem(null)}
            />
          }
          onClose={() => setEditingItem(null)}
        />
      )}
    </>
  );
};
