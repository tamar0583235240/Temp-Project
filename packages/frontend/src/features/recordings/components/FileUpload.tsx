import React, { useRef, useState } from "react";
import { useUploadRecordingMutation } from "../services/resourceApi";

interface FileUploadProps {
  userId: string;
  questionId: string;
  onUploaded: (fileUrl: string, fileName: string) => void;
  buttonText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ userId, questionId, onUploaded, buttonText = "העלה קובץ" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadRecording, { isLoading }] = useUploadRecordingMutation();
  const [loading, setLoading] = useState(false);

  const handleFileButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", file.name); 
    formData.append("description", "");
    formData.append("file", file);
    try {
      const uploadRes = await uploadRecording(formData).unwrap();
      setLoading(false);
      onUploaded(uploadRes.url, file.name);
    } catch (e) {
      setLoading(false);
      alert("שגיאה בהעלאת קובץ");
    }
  };

  return (
    <>
      <button
        type="button"
        className="w-1/2 border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold hover:bg-[--color-background] transition text-lg flex items-center justify-center gap-2"
        onClick={handleFileButtonClick}
        disabled={isLoading || loading}
      >
        {loading ? "מעלה קובץ..." : buttonText}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="audio/*,video/*"
      />
    </>
  );
};

export default FileUpload;
