import React from 'react';
import { useGetRemindersQuery } from '../services/remindersApi';
import { FaQuestionCircle, FaLightbulb, FaHeart } from 'react-icons/fa';


const ReminderComponent: React.FC = () => {
  const { data: reminders, isLoading, error } = useGetRemindersQuery();

  if (isLoading) return <p>טוען טיפים...</p>;
  if (error) return <p>שגיאה בטעינת טיפים</p>;
  if (!reminders || (!Array.isArray(reminders) && "message" in reminders)) {
    return <p> אין טיפים / תזכורות זמינים :( </p>;
  }


  const renderIcon = (text: string) => {
    if (text.includes('טיפ') || text.includes('שתה')) return <FaLightbulb className="text-yellow-500" />;
    if (text.includes('פעילות')) return <FaQuestionCircle className="text-blue-500" />;
    return <FaHeart className="text-pink-400" />;
  };

  const formatFrequency = (f: string) => {
    switch (f) {
      case 'daily': return 'כל יום';
      case 'every_2_days': return 'כל יומיים';
      case 'every_3_days': return 'פעם ב-3 ימים';
      case 'weekly': return 'פעם בשבוע';
      default: return 'תדירות לא ידועה';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">תזכורות אישיות</h2>
      <ul className="space-y-4">
        {reminders?.map((tip) => (
          <li
            key={`${tip.id}-${tip.content}`}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="text-2xl">{renderIcon(tip.content)}</div>
            <div className="flex-1">
              <p className="font-medium">{tip.content}</p>
              <p className="text-sm text-gray-600">{formatFrequency(tip.user?.user_reminder_settings?.frequency)}</p>
              {/* <p className="text-sm text-gray-600">{formatFrequency(tip.user.user_reminder_settings.frequency)}</p> */}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-gray-500">
        ניתן לשנות או לבטל תזכורות בכל שלב דרך מסך ההגדרות.
      </p>
    </div>
  );
};

export default ReminderComponent;