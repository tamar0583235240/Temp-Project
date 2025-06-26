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
