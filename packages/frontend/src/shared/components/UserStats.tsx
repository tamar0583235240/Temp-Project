


// ✅ WeeklyStats.tsx --> מוחלף ל־UserStats.tsx כולל יומי ושבועי
import { useEffect, useState } from "react";

export const UserStats = () => {
  const [weekly, setWeekly] = useState<{ activeUsers: number; avgTimeMinutes: number } | null>(null);
  const [daily, setDaily] = useState<{ activeUsers: number; avgTimeMinutes: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("אין טוקן");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("קריאה נכשלה");
        const data = await res.json();
        setWeekly(data.weekly);
        setDaily(data.daily);
      } catch (err) {
        console.error("שגיאה בשליפת סטטיסטיקות:", err);
      }
    };

    fetchStats();
  }, []);

  const formatTime = (minutes: number) => {
    if (!minutes || isNaN(minutes) || minutes <= 0) return "0:00";
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center mt-6 space-y-4">
      {weekly && (
        <div>
          <p className="text-lg font-bold">📊 משתמשות פעילות בשבוע: {weekly.activeUsers}</p>
          <p className="text-md">⏳ זמן שהייה ממוצע בשבוע: {formatTime(weekly.avgTimeMinutes)} דקות</p>
        </div>
      )}
      {daily && (
        <div>
          <p className="text-lg font-bold">📆 משתמשות פעילות היום: {daily.activeUsers}</p>
          <p className="text-md">⏱ זמן שהייה ממוצע היום: {formatTime(daily.avgTimeMinutes)} דקות</p>
        </div>
      )}
    </div>
  );
};
