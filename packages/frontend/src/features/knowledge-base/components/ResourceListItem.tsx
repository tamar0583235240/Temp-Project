import { Pencil, Trash2, FileText } from 'lucide-react';
import { FC } from 'react';
import { eType, Resource } from '../types/Resource';

const typeLabels: Record<eType, string> = {
  [eType.text]: "קובץ טקסט",
  [eType.link]: "לינק",
  [eType.pdf]: "קובץ PDF",
};

interface ResourceListItemProps {
  item: Resource;
  onEdit: (id: number,res:Resource) => void;
  onDelete: (id: number) => void;
}

export const ResourceListItem= ({item,onEdit,onDelete}: ResourceListItemProps) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-6 items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-right">
      <div className="col-span-1 font-semibold text-gray-800 text-sm truncate">{item.title}</div>
      <div className="col-span-2 text-gray-600 text-sm truncate">{item.description}</div>
      <div className="col-span-1 text-gray-500 text-sm">{typeLabels[item.type]}</div>
      <div className="col-span-1">
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-end gap-1 text-blue-600 hover:underline text-sm"
        >
          <FileText size={18} />
          <span>צפה</span>
        </a>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-3">
        <span className="text-xs text-gray-400">{formattedDate}</span>
        <button
          aria-label="עריכת משאב"
          onClick={() => onEdit(item.id,item)}
          className="text-yellow-500 hover:text-yellow-600 transition"
          title="ערוך"
        >
          <Pencil size={18} />
        </button>
        <button
          aria-label="מחיקת משאב"
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
