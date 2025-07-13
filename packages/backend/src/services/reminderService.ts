import reminderRepository from '../reposioty/reminderRepository'

const saveUserSettings = async (
  userId: string,
  settings: Record<string, string>
) => {
  // שומרים ישירות, בלי מיפוי
  for (const [type, frequency] of Object.entries(settings)) {
    if (type !== "practice" && type !== "tip") continue; // בטחון
    await reminderRepository.upsertReminder(userId, type, frequency);
  }
};

export default { saveUserSettings };
