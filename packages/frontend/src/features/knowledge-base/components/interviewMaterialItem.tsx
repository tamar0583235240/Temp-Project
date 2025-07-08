import { Pencil, Trash2, Download } from 'lucide-react';
import { InterviewMaterial } from "../types/InterviewMaterial"
import { useState } from 'react';



interface interviewMaterialListItemProps {
  item: InterviewMaterial;
  onEdit: (id: number, res: InterviewMaterial) => void;
  onDelete: (id: number) => void;
}

export const InterviewMaterialListItem = ({ item, onEdit, onDelete }: interviewMaterialListItemProps) => {

  return (
    <div className="grid grid-cols-6 items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-right">
      <div className="col-span-2 font-semibold text-gray-800 text-sm truncate">
        {item.title}
      </div>

      <div className="col-span-2 text-gray-600 text-sm truncate">
        {item.short_description || "אין תיאור"}
      </div>

      <div className="col-span-1 flex justify-end">
        <img
          src={item.thumbnail}
          alt={`תמונה עבור ${item.title}`}
          className="w-12 h-12 rounded object-cover border border-gray-200"
        />
      </div>

      <div className="col-span-1 flex items-center justify-end gap-3">

        <a
          href={item.file_url}
          download={item.title}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition text-sm"
          title="הורד קובץ"
        >
          <Download size={18} />
          <span>הורד</span>
        </a>



        <button
          aria-label="עריכת חומר"
          onClick={() => onEdit(item.id, item)}
          className="text-yellow-500 hover:text-yellow-600 transition"
          title="ערוך"
        >
          <Pencil size={18} />
        </button>

        <button
          aria-label="מחיקת חומר"
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-600 transition"
          title="מחק"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>

  );
};
