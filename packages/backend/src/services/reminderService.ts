// services/reminderService.ts
import reminderRepository from "../reposioty/reminderRepository";
import { ReminderSelection, ReminderType } from "../interfaces/reminderInterfaces";

async function saveReminderSettings(userId: string, settings: Record<ReminderType, ReminderSelection>) {
  const promises = Object.entries(settings).map(([type, { is_enabled, frequency }]) => {
    return reminderRepository.upsertReminderSetting(userId, type as ReminderType, is_enabled, frequency);
  });
  await Promise.all(promises);
}

async function getUserReminderSettings(userId: string) {
  const result = await reminderRepository.getReminderSettingsByUser(userId);
  const formatted: Record<ReminderType, ReminderSelection> = {
    tip: { is_enabled: false, frequency: null },
    practice: { is_enabled: false, frequency: null },
  };
  for (const row of result as Array<{ type: ReminderType; is_enabled: boolean; frequency: any }>) {
    formatted[row.type] = {
      is_enabled: row.is_enabled,
      frequency: row.frequency,
    };
  }
  return formatted;
}

export default {
  saveReminderSettings,
  getUserReminderSettings,
};
