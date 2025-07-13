// pages/RemindersPage.tsx

import React, { useState } from "react";
import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
import { useSaveUserReminderSettingsMutation } from "../shared/api/api";
import { GridContainer } from "../shared/ui/GridContainer";
import { Button } from "../shared/ui/button";
import { ReminderType } from "../features/reminders/types/reminderType";


type ReminderSelections = Record<ReminderType, string | null>;

export default function RemindersPage() {
  const [selections, setSelections] = useState<ReminderSelections>({
    practice: null,
    tip: null,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "warning" | null>(null);

  const [saveUserReminderSettings] = useSaveUserReminderSettingsMutation();

  const showMessage = (msg: string, type: "success" | "warning") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const handleOptionChange = (reminderType: ReminderType, optionId: string | null) => {
    setSelections((prev) => ({ ...prev, [reminderType]: optionId }));
  };

  const handleSaveAll = async () => {
    const filteredSettings: Record<string, string> = Object.entries(selections).reduce(
      (acc, [key, value]) => {
        if (value !== null) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    if (Object.keys(filteredSettings).length === 0) {
      showMessage("לא נבחרו תזכורות", "warning");
      return;
    }

    try {
      await saveUserReminderSettings({
        userId: "63b3ab3c-e4d7-485d-ba3e-36748208835e", // להחליף לפי user מחובר
        settings: filteredSettings,
      });
      showMessage("נשמר בהצלחה!", "success");
    } catch (error) {
      console.error("שגיאה:", error);
      showMessage("אירעה שגיאה בשמירה", "warning");
    }
  };

  return (
    <div className="min-h-screen">
      <GridContainer maxWidth="md">
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {message}
          </div>
        )}

        <ReminderSettingsCard
          title="תרגול שאלות מקצועיות"
          description="קבל תזכורות לתרגול שאלות מקצועיות"
          reminderType="practice"
          savedOption={selections.practice}
          onOptionChange={handleOptionChange}
        />

        <ReminderSettingsCard
          title="טיפים"
          description="קבל טיפ מעשי כל כמה ימים!"
          reminderType="tip"
          savedOption={selections.tip}
          onOptionChange={handleOptionChange}
        />

        <div className="mt-8 text-center">
          <Button size="lg" onClick={handleSaveAll}>שמור את כל התזכורות</Button>
        </div>
      </GridContainer>
    </div>
  );
}
