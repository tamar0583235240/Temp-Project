export interface UserReminderSettings {
    id: string;
    user_id: string;
    tip_id: string;
    type: string;
    tip_frequency: string;
    is_enabled: boolean;
    last_sent_at: Date;
}