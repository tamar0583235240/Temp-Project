import React, { useState } from "react";
import { useUploadRecordingMutation } from "../services/resourceApi";

interface FileUploadProps {
  userId: string;
  questionId: string;
  file: File; // קובץ להעלאה
  onUploaded: (fileUrl: string, fileName: string) => void;
  onError?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ userId, questionId, file, onUploaded, onError }) => {
  const [uploadRecording, { isLoading }] = useUploadRecordingMutation();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!file) return;
    const upload = async () => {
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
        if (onError) onError();
      }
    };
    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return null; // קומפוננטה לוגית בלבד
};

export default FileUpload;
