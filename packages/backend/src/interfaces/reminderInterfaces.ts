
export interface Reminder {
    id: number;
    user_id: number;
    content: string;
    last_sent_at: string | null;
    user: {
        user_reminder_settings: {
            frequency: 'daily' | 'every_2_days' | 'every_3_days' | '"weekly"';
        }
    };
}
