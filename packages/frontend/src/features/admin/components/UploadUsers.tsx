import { ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useUploadUsers } from "../hooks/useUploadUsers";
import { Upload } from "lucide-react";

export const UploadUsers = () => {
  const { upload, loading } = useUploadUsers();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const confirmResult = await Swal.fire({
        title: "?האם לעדכן משתמשים",
        text: "הפעולה תעלה את המשתמשים מהקובץ למערכת",
        icon: "question",
        iconColor: '#64748B',
        showCancelButton: true,
        confirmButtonText: "כן, עדכן",
        cancelButtonText: "ביטול",
        confirmButtonColor: "#00B894",
        cancelButtonColor: "#64748B",
      });

      if (confirmResult.isConfirmed) {
        Swal.fire({
          title: "טוען...",
          html: '<div class="spinner"></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await upload(file);
          Swal.fire("הצלחה", "!המשתמשים הועלו בהצלחה", "success");
        } catch (err: any) {
          Swal.fire("שגיאה", err.message || "אירעה שגיאה בהעלאת המשתמשים", "error");
        }
      }
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor="fileUpload"
        className={`bg-primary-dark text-white px-4 py-2 rounded-md font-medium cursor-pointer transition flex items-center gap-2
        ${loading ? 'cursor-not-allowed opacity-60' : 'hover:bg-primary-dark/90'}`}
      >
        <Upload className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        טעינה מקובץ
      </label>

      <input
        id="fileUpload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        disabled={loading}
        className="hidden"
      />

      <style>
        {`
          .spinner {
            margin: 0 auto;
            width: 40px;
            height: 40px;
            border: 5px solid #ccc;
            border-top: 5px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
