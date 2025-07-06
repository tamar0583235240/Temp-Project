export default interface tip {
    id: string;
    content: string;
    user: {
        user_reminder_settings: {
            tip_frequency: string;
        };
    }
}
