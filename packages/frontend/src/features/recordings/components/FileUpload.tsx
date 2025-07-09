import React, { useRef, useState } from "react";
import { useUploadRecordingMutation } from "../services/resourceApi";
import { Trash2 } from "lucide-react";
import MagicLoader from "../../interview/components/MagicLoader";
import { Spinner } from "../../../shared/ui/Spinner";

interface FileUploadProps {
  userId: string;
  onUploaded: (fileUrl: string, fileName: string) => void;
  onError?: (error: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ userId, onUploaded, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadRecording] = useUploadRecordingMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", file.name);
    formData.append("description", "");
    formData.append("file", file);
    try {
      const res = await uploadRecording(formData).unwrap();
      onUploaded(res.url, file.name);
      handleRemove();
    } catch (e) {
      onError?.(e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <input
        type="file"
        accept="audio/*,video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={isUploading}
      />
      {!file && (
        <button
          type="button"
          className="w-full border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold transition text-lg flex items-center justify-center gap-2 hover:bg-[--color-background]"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          העלה קובץ
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      )}
      {file && (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-2 w-full justify-center">
            <button
              className="p-1 text-red-500 hover:text-red-700 order-1"
              onClick={handleRemove}
              title="מחק קובץ"
              style={{ marginLeft: 4 }}
              disabled={isUploading}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700 order-2">{file.name}</span>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-[--color-primary-dark] transition"
              onClick={handleUpload}
              disabled={isUploading}
            >
              העלה
            </button>
          </div>
        </div>
      )}
      {isUploading && <Spinner />}
    </div>
  );
};

export default FileUpload;