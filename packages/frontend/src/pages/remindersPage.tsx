import React, { useState } from 'react';
import ReminderSettingsCard from '../features/reminders/components/ReminderSettingsCard';
import { useSaveUserReminderSettingsMutation } from '../shared/api/api';

type Selections = {
  [reminderType: string]: string | null;
};

export default function RemindersPage() {
  const [selections, setSelections] = useState<Selections>({
    questions: null,
    tips: null,
  });

  const [saveUserReminderSettings] = useSaveUserReminderSettingsMutation();
  const userId = "63b3ab3c-e4d7-485d-ba3e-36748208835e"; // הנחה שהמשתמש מחובר

  const handleOptionChange = (reminderType: string, optionId: string | null) => {
    setSelections((prev) => ({
      ...prev,
      [reminderType]: optionId,
    }));
  };

  const handleSaveAll = async () => {
    const missing = Object.entries(selections).filter(
      ([, optionId]) => optionId === null
    );
    if (missing.length > 0) {
      alert(
        `אנא בחר תדירות לכל התזכורות לפני שמירה.\nלא נבחר עבור: ${missing
          .map(([key]) => key)
          .join(', ')}`
      );
      return;
    }

    const messages = Object.entries(selections)
      .map(([reminderType, optionId]) => {
        let text = '';
        switch (optionId) {
          case 'every-two-days':
            text = 'כל יומיים';
            break;
          case 'daily':
            text = 'כל יום';
            break;
          case 'weekly':
            text = 'אחת לשבוע';
            break;
          case 'every-three-days':
            text = 'אחת ל-3 ימים';
            break;
          default:
            text = 'לא נבחר';
        }
        return `סוג: ${reminderType}\nתדירות: ${text}`;
      })
      .join('\n\n');

    alert(`התזכורות נשמרו בהצלחה:\n\n${messages}`);

    try {
      await saveUserReminderSettings({
        userId: userId,
        settings: selections as Record<string, string>,
      });
      alert('התזכורות נשמרו בהצלחה!');
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      alert('אירעה שגיאה בעת שמירת התזכורות');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <ReminderSettingsCard
          title="תרגול שאלות מקצועיות"
          description="קבל תזכורות לתרגול שאלות מקצועיות כדי לשפר את הידע שלך."
          reminderType="questions"
          savedOption={selections.questions}
          onOptionChange={handleOptionChange}
        />

        <ReminderSettingsCard
          title="טיפים"
          description="!קבל טיפ מעשי"
          reminderType="tips"
          savedOption={selections.tips}
          onOptionChange={handleOptionChange}
        />

        <div className="mt-8 text-center">
          <button
            onClick={handleSaveAll}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            שמור את כל התזכורות
          </button>
        </div>
      </div>
    </div>
  );
}