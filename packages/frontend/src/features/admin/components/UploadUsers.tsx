import React, { ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useUploadUsers } from "../hooks/useUploadUsers";

export const UploadUsers = () => {
  const { upload, loading } = useUploadUsers();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const confirmResult = await Swal.fire({
        title: "האם לעדכן משתמשים?",
        text: "הפעולה תעלה את המשתמשים מהקובץ למערכת",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "כן, עדכן",
        cancelButtonText: "ביטול",
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
          Swal.fire("הצלחה", "המשתמשים הועלו בהצלחה!", "success");
        } catch (err: any) {
          Swal.fire("שגיאה", err.message || "אירעה שגיאה בהעלאת המשתמשים", "error");
        }
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>העלאת משתמשים מקובץ Excel</h2>

      <label
        htmlFor="fileUpload"
        style={{
          display: "inline-block",
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        בחר קובץ Excel
      </label>

      <input
        id="fileUpload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        disabled={loading}
        style={{ display: "none" }}
      />

      {/* Spinner CSS עבור SweetAlert */}
      <style>
        {`
          .spinner {
            margin: 0 auto;
            width: 40px;
            height: 40px;
            border: 5px solid #ccc;
            border-top: 5px solid #007bff;
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
