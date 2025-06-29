export function isReminderDue(lastSentAt: string | null, frequency: string): boolean {
  const now = new Date();
  const last = new Date(lastSentAt || 0);
  const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

  switch (frequency) {
    case 'daily': return diffDays >= 1;
    case 'every_2_days': return diffDays >= 2;
    case 'every_3_days': return diffDays >= 3;
    case 'weekly': return diffDays >= 7;
    default: return false;
  }
}

export const isSentToday = (lastSentAt?: string | null): boolean => {
  if (!lastSentAt) return false;
  const now = new Date();
  const lastDate = new Date(lastSentAt);
  return now.toDateString() === lastDate.toDateString();
}

export const isEarlier = (dateA: string | null, dateB: string | null): boolean => {
  if (!dateA) return true; // אם אין תאריך A – נחשב כיותר ישן
  if (!dateB) return false; // אם אין תאריך B – A בטוח לא ישן יותר
  return new Date(dateA).getTime() < new Date(dateB).getTime();
}


