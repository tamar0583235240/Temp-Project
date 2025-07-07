// import React, { useState } from "react";
// import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
// import ReminderComponent from "../features/reminders/components/remindersComponents";
// import { useSaveUserReminderSettingsMutation } from "../shared/api/api";
// import { GridContainer } from "../shared/ui/GridContainer";
// import { Button } from "../shared/ui/button";

// // הגדרת טיפוס מדויק
// type ReminderSelections = Record<string, string | null>;

// export default function RemindersPage() {
//   const [selections, setSelections] = useState<ReminderSelections>({
//     questions: null,
//     tips: null,
//   });

//   const [message, setMessage] = useState<string | null>(null);
//   const [messageType, setMessageType] = useState<"success" | "warning" | null>(null);

//   const [saveUserReminderSettings] = useSaveUserReminderSettingsMutation();

//   const showMessage = (msg: string, type: "success" | "warning") => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => {
//       setMessage(null);
//       setMessageType(null);
//     }, 3000);
//   };

//   const handleOptionChange = (reminderType: string, optionId: string | null) => {
//     setSelections((prev) => ({
//       ...prev,
//       [reminderType]: optionId,
//     }));
//   };

//   const handleSaveAll = async () => {
//     // מסנן רק תזכורות שנבחרו (לא null) ושולח בצורה תקינה
//     const filteredSettings: Record<string, string> = Object.entries(selections).reduce(
//       (acc, [key, value]) => {
//         if (value !== null) {
//           acc[key] = value;
//         }
//         return acc;
//       },
//       {} as Record<string, string>
//     );

//     if (Object.keys(filteredSettings).length === 0) {
//       showMessage("לא נבחרו תזכורות. תוכל להוסיף מתי שתרצה בהמשך.", "warning");
//       return;
//     }

//     try {
//       await saveUserReminderSettings({
//         userId: "13a8730d-6247-4988-8fa1-a28abd6fb131",
//         settings: filteredSettings,
//       });
//       showMessage("התזכורות נשמרו בהצלחה!", "success");
//     } catch (error) {
//       console.error("שגיאה בשמירה:", error);
//       showMessage("אירעה שגיאה בעת שמירת התזכורות", "warning");
//     }
//   };

//   return (
//     // dir="rtl"
//     <div className="min-h-screen"  >
//       {/* <ReminderComponent /> */}

//       <GridContainer maxWidth="md">
//         {message && (
//           <div
//             className={`mb-4 p-3 rounded text-sm ${
//               messageType === "success"
//                 ? "bg-green-100 text-green-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <ReminderSettingsCard
//           title="תרגול שאלות מקצועיות"
//           description="קבל תזכורות לתרגול שאלות מקצועיות כדי לשפר את הידע שלך."
//           reminderType="questions"
//           savedOption={selections.questions}
//           onOptionChange={handleOptionChange}
//         />

//         <ReminderSettingsCard
//           title="טיפים"
//           description="קבל טיפ מעשי כל כמה ימים!"
//           reminderType="tips"
//           savedOption={selections.tips}
//           onOptionChange={handleOptionChange}
//         />

//         <div className="mt-8 text-center">
//           <Button size="lg" onClick={handleSaveAll}>
//             שמור את כל התזכורות
//           </Button>
//         </div>
//       </GridContainer>
//     </div>
//   );
// }
