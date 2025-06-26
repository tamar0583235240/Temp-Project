import React from 'react';
import ReminderSettingsCard from '../features/reminders/components/ReminderSettingsCard';

export default function RemindersPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <ReminderSettingsCard
          title="תרגול שאלות מקצועיות"
          description="קבל תזכורות לתרגול שאלות מקצועיות כדי לשפר את הידע שלך."
          reminderType="questions"
        />

        <ReminderSettingsCard
          title="טיפים"
          description="!קבל טיפ מעשי"
          reminderType="tips"
        />
      </div>
    </div>
  );
}