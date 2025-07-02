export function isReminderDue(lastSentAt: string | null, frequency: string): boolean {
  const now = new Date();
  const last = new Date(lastSentAt || 0);

  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDateOnly = new Date(last.getFullYear(), last.getMonth(), last.getDate());

  const diffDays = (nowDateOnly.getTime() - lastDateOnly.getTime()) / (1000 * 60 * 60 * 24);

  switch (frequency) {
    case 'daily': return diffDays >= 1;
    case 'every_2_days': return diffDays >= 2;
    case 'every_3_days': return diffDays >= 3;
    case 'weekly': return diffDays >= 7;
    default: return false;
  }
}


export const isSentToday = (lastSentAt: Date | null): boolean => {
  if (!lastSentAt) return false;

  const now = new Date();
  const last = new Date(lastSentAt);

  return now.toDateString() === last.toDateString();
};

export const isEarlier = (dateA: string | null, dateB: string | null): boolean => {
  if (!dateA) return true; 
  if (!dateB) return false; 
  return new Date(dateA).getTime() < new Date(dateB).getTime();
}


