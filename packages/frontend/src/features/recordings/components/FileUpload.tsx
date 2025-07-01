import React from "react";
import { useUploadRecordingMutation } from "../services/resourceApi";

interface FileUploadProps {
  userId: string;
  questionId: string;
  file: File;
  onUploaded: (fileUrl: string, fileName: string) => void;
  onError?: (error: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ userId, questionId, file, onUploaded, onError }) => {
  const [uploadRecording] = useUploadRecordingMutation();

  React.useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", file.name); 
      formData.append("description", "");
      formData.append("file", file);
      try {
        const uploadRes = await uploadRecording(formData).unwrap();
        onUploaded(uploadRes.url, file.name);
      } catch (e) {
        onError?.(e);
      }
    };
    if (file) upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return null;
};

export default FileUpload;
