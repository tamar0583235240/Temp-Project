import { useState } from "react";
import { useUploadUsersExcelMutation } from "../services/adminApi";

export const useUploadUsers = () => {
  const [uploadUsersExcel, { isLoading }] = useUploadUsersExcelMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const upload = async (file: File) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadUsersExcel(formData).unwrap();
      setSuccessMessage("המשתמשים הועלו בהצלחה!");
    } catch (err: any) {
      setErrorMessage(err?.data || "שגיאה בהעלאת הקובץ");
    }
  };

  return {
    upload,
    loading: isLoading,
    error: errorMessage,
    successMessage,
  };
};
