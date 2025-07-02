
import React, { useState } from 'react'; 

import ReminderSettingsCard from '../features/reminders/components/ReminderSettingsCard';
import ReminderComponent from '../features/reminders/components/remindersComponents';
import { useSaveUserReminderSettingsMutation } from '../shared/api/api';

type Selections = {
  [reminderType: string]: string | null;
};

export default function RemindersPage() {
  const [selections, setSelections] = useState<Selections>({
    questions: null,
    tips: null,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'warning' | null>(null);

  const showMessage = (msg: string, type: 'success' | 'warning') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const [saveUserReminderSettings] = useSaveUserReminderSettingsMutation();
  const userId = "63b3ab3c-e4d7-485d-ba3e-36748208835e"; // משתמש דמה

  const handleOptionChange = (reminderType: string, optionId: string | null) => {
    setSelections((prev) => ({
      ...prev,
      [reminderType]: optionId,
    }));
  };

  const handleSaveAll = async () => {
    const selected = Object.entries(selections).filter(
      ([, optionId]) => optionId !== null
    );

    if (selected.length === 0) {
      showMessage("לא נבחרו תזכורות. תוכל להוסיף מתי שתרצה בהמשך.", 'warning');
      return;
    }

    try {
      await saveUserReminderSettings({
        userId: userId,
        settings: selections as Record<string, string>,
      });
      showMessage('התזכורות נשמרו בהצלחה!', 'success');
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      showMessage('אירעה שגיאה בעת שמירת התזכורות', 'warning');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* <ReminderComponent/> */}
      <div className="max-w-md mx-auto">
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              messageType === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {message}
          </div>
        )}

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
