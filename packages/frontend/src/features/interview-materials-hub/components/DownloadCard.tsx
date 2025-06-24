import React from "react";

type DownloadCardProps = {
  title: string;
  description: string;
  onView: () => void;
  onDownload: () => void;
};

const DownloadCard: React.FC<DownloadCardProps> = ({ title, description, onView, onDownload }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-4 flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          צפייה
        </button>
        <button
          onClick={onDownload}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          הורדה
        </button>
      </div>
    </div>
  );
};

export default DownloadCard;
