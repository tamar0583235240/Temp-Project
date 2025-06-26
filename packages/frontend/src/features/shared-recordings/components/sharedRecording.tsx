// src/features/shared-recordings/components/SharedRecordingEmail.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteEmailFromSharedRecordingMutation,
} from "../services/SharedRecordingsApi";

const SharedRecording: React.FC = () => {
  /** 1. מזהה ההקלטה מה-URL */
  const sharedRecordingId = "00000000-0000-0000-0000-000000000040"

  /** 2. דפדוף – יאפשר לשנות את כתובת ה-URL אחרי הפעולה */
  const navigate = useNavigate();

  /** 3. אימייל זמני */
  const email = "eitan.cohen@example.com";


  /** 4. Mutation */
  const [removeEmail, { isLoading }] = useDeleteEmailFromSharedRecordingMutation();

  /** 5. Handler */
  const handleRemove = async () => {
    if (!sharedRecordingId) return;

    try {
      // קריאה ל-DELETE (ה-URL נבנה לפי SharedRecordingsApi)
      await removeEmail({ sharedRecordingId, email }).unwrap();

      // שינוי כתובת ה-URL בדפדפן:
      // כאן לדוגמה – חוזרים לעמוד רשימת ההקלטות
      navigate("/recordings", { replace: true });

      /* אם את רוצה דווקא לנווט ל-API עצמו (לדוגמה כדי לראות JSON),
         אפשר גם:
         window.location.href = `${import.meta.env.VITE_BACKEND_URL}/sharedRecordings/${sharedRecordingId}/${encodeURIComponent(email)}`;
         אבל בדרך-כלל משאירים את הקריאה ב-fetch/RTK Query
         ורק משנים Route פנימי של React. */
    } catch (err) {
      console.error("Failed to remove sharing:", err);
    }
  };

  if (!email) return null;

  return (
    <div className="flex items-center gap-3 border-b pb-1">
      <span className="flex-1 break-all">{email}</span>
      <button
        className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50"
        disabled={isLoading}
        onClick={handleRemove}
      >
        הסרת גישה
      </button>
    </div>
  );
};

export default SharedRecording;
