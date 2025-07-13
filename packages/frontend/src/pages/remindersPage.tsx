import React, { useEffect, useState } from "react";



import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
import { useGetUserReminderSettingsQuery, useSaveUserReminderSettingsMutation } from "../shared/api/api";
import { ReminderSelection, ReminderType} from "../features/reminders/types/reminderType";



export default function RemindersPage() {
  const userId = "63b3ab3c-e4d7-485d-ba3e-36748208835e"; // ניתן להחליף ל־auth דינמי

  const { data, isLoading } = useGetUserReminderSettingsQuery(userId);
  const [saveSettings, { isLoading: isSaving }] = useSaveUserReminderSettingsMutation();

  const [selections, setSelections] = useState<Record<ReminderType, ReminderSelection>>({
    tip: { is_enabled: false, frequency: null },
    practice: { is_enabled: false, frequency: null },
  });

  useEffect(() => {
    if (data) setSelections(data);
  }, [data]);

  const handleOptionChange = (reminderType: ReminderType, data: ReminderSelection) => {
    setSelections((prev) => ({ ...prev, [reminderType]: data }));
  };

  const handleSave = async () => {
    try {
      await saveSettings({ userId, settings: selections }).unwrap();
      alert("ההגדרות נשמרו בהצלחה!");
    } catch (e) {
      alert("אירעה שגיאה בשמירה");
    }
  };

  if (isLoading) return <div>טוען...</div>;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <ReminderSettingsCard
        title="תזכורות טיפים"
        description="קבלי טיפים שימושיים באופן קבוע"
        reminderType="tip"
        savedOption={selections.tip}
        onOptionChange={handleOptionChange}
      />
      <ReminderSettingsCard
        title="תזכורות לתרגול"
        description="תזכורת לשאלות מקצועיות באורך זמן שתבחרי"
        reminderType="practice"
        savedOption={selections.practice}
        onOptionChange={handleOptionChange}
      />
      <div className="text-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "שומר..." : "שמור"}
        </button>
      </div>
    </div>
  );
}



// בודקת את העיצוב החדש
//!!!!אם עובד לי אם לא טוב משאירה בהערה
//יעבוד על זה אחכ
// // pages/RemindersPage.tsx

// import React, { useEffect, useState } from "react";
// import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
// import {
//   useGetUserReminderSettingsQuery,
//   useSaveUserReminderSettingsMutation,
// } from "../shared/api/api";
// import {
//   ReminderSelection,
//   ReminderType,
// } from "../features/reminders/types/reminderType";

// type MessageType = "success" | "error" | null;

// export default function RemindersPage() {
//   const userId = "63b3ab3c-e4d7-485d-ba3e-36748208835e"; // בהמשך להחליף ב־auth אמיתי

//   const { data, isLoading } = useGetUserReminderSettingsQuery(userId);
//   const [saveSettings, { isLoading: isSaving }] =
//     useSaveUserReminderSettingsMutation();

//   const [selections, setSelections] = useState<
//     Record<ReminderType, ReminderSelection>
//   >({
//     tip: { is_enabled: false, frequency: null },
//     practice: { is_enabled: false, frequency: null },
//   });

//   const [message, setMessage] = useState<string | null>(null);
//   const [messageType, setMessageType] = useState<MessageType>(null);

//   useEffect(() => {
//     if (data) setSelections(data);
//   }, [data]);

//   const showMessage = (text: string, type: MessageType) => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => {
//       setMessage(null);
//       setMessageType(null);
//     }, 3000);
//   };

//   const handleOptionChange = (
//     reminderType: ReminderType,
//     data: ReminderSelection
//   ) => {
//     setSelections((prev) => ({
//       ...prev,
//       [reminderType]: data,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       await saveSettings({ userId, settings: selections }).unwrap();
//       showMessage("!ההגדרות נשמרו בהצלחה", "success");
//     } catch (e) {
//       showMessage("אירעה שגיאה בשמירה 😞", "error");
//     }
//   };

//   if (isLoading) return <div className="text-center mt-10">טוען...</div>;

//   return (
//     <div className="max-w-xl mx-auto py-10 space-y-6">
//       {message && (
//         <div
//           className={`p-3 rounded text-sm text-center font-medium ${
//             messageType === "success"
//               ? "bg-green-100 text-green-800 border border-green-300"
//               : "bg-red-100 text-red-800 border border-red-300"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <ReminderSettingsCard
//         title="תזכורות טיפים"
//         description="קבלי טיפים שימושיים באופן קבוע"
//         reminderType="tip"
//         savedOption={selections.tip}
//         onOptionChange={handleOptionChange}
//       />

//       <ReminderSettingsCard
//         title="תזכורות לתרגול"
//         description="תזכורת לשאלות מקצועיות באורך זמן שתבחרי"
//         reminderType="practice"
//         savedOption={selections.practice}
//         onOptionChange={handleOptionChange}
//       />

//       <div className="text-center pt-4">
//         <button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSaving ? "שומר..." : "שמור"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // העיצוב החדש 
// import React, { useEffect, useState } from "react";
// import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
// import {
//   useGetUserReminderSettingsQuery,
//   useSaveUserReminderSettingsMutation,
// } from "../shared/api/api";
// import {
//   ReminderSelection,
//   ReminderType,
// } from "../features/reminders/types/reminderType";

// export default function RemindersPage() {
//   const userId = "63b3ab3c-e4d7-485d-ba3e-36748208835e"; // להחליף ל־auth דינמי בעתיד

//   const { data, isLoading } = useGetUserReminderSettingsQuery(userId);
//   const [saveSettings, { isLoading: isSaving }] = useSaveUserReminderSettingsMutation();

//   const [selections, setSelections] = useState<Record<ReminderType, ReminderSelection>>({
//     tip: { is_enabled: false, frequency: null },
//     practice: { is_enabled: false, frequency: null },
//   });

//   const [initialSelections, setInitialSelections] = useState<typeof selections | null>(null);
//   const [message, setMessage] = useState<{ text: string; type: "success" | "warning" } | null>(null);

//   useEffect(() => {
//     if (data) {
//       setSelections(data);
//       setInitialSelections(data);
//     }
//   }, [data]);

//   const handleOptionChange = (reminderType: ReminderType, newSelection: ReminderSelection) => {
//     setSelections((prev) => ({ ...prev, [reminderType]: newSelection }));
//   };

//   const hasChanged = () => {
//     if (!initialSelections) return true;
//     return (
//       selections.tip.is_enabled !== initialSelections.tip.is_enabled ||
//       selections.tip.frequency !== initialSelections.tip.frequency ||
//       selections.practice.is_enabled !== initialSelections.practice.is_enabled ||
//       selections.practice.frequency !== initialSelections.practice.frequency
//     );
//   };

//   const handleSave = async () => {
//     if (!hasChanged()) {
//       return; // אין שינוי – לא שומר
//     }

//     const atLeastOneEnabled = Object.values(selections).some(
//       (sel) => sel.is_enabled && sel.frequency
//     );

//     const atLeastOneDefined = Object.values(selections).some(
//       (sel) => sel.is_enabled || sel.frequency
//     );

//     if (!atLeastOneDefined) {
//       setMessage({
//         type: "warning",
//         text: "לא נבחרו תזכורות. תוכל להוסיף מתי שתרצה בהמשך.",
//       });
//       return;
//     }

//     try {
//       await saveSettings({ userId, settings: selections }).unwrap();
//       setInitialSelections(selections); // עדכון להשוואה הבאה
//       setMessage({ type: "success", text: "ההגדרות נשמרו בהצלחה!" });
//     } catch (e) {
//       setMessage({ type: "warning", text: "אירעה שגיאה בשמירה" });
//     }
//   };

//   if (isLoading) return <div>טוען...</div>;

//   return (
//     <div className="space-y-6 max-w-xl mx-auto">
//       <ReminderSettingsCard
//         title="תזכורות טיפים"
//         description="קבלי טיפים שימושיים באופן קבוע"
//         reminderType="tip"
//         savedOption={selections.tip}
//         onOptionChange={handleOptionChange}
//       />
//       <ReminderSettingsCard
//         title="תזכורות לתרגול"
//         description="תזכורת לשאלות מקצועיות באורך זמן שתבחרי"
//         reminderType="practice"
//         savedOption={selections.practice}
//         onOptionChange={handleOptionChange}
//       />

//       {message && (
//         <div
//           className={`rounded-lg p-3 text-center font-medium ${
//             message.type === "success"
//               ? "bg-green-100 text-green-800 border border-green-300"
//               : "bg-yellow-100 text-yellow-800 border border-yellow-300"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <div className="text-center">
//         <button
//           className="bg-primary text-white px-5 py-2 rounded hover:bg-primary-dark transition"
//           onClick={handleSave}
//           disabled={isSaving}
//         >
//           {isSaving ? "שומר..." : "שמירה"}
//         </button>
//       </div>
//     </div>
//   );
// }
