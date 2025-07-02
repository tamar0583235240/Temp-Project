import reminderRepository from '../reposioty/reminderRepository';

jest.mock('../reposioty/reminderRepository');

import request from 'supertest';
import app from '../../app';

describe('בדיקות ל-reminderController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/tips (200) מחזיר תזכורות לפי תזמון (dueReminders)', async () => {
        const mockReminders = [
            {
                id: '1',
                content: 'טיפ 1',
                last_sent_at: '2024-01-01T00:00:00Z',
                user: {
                    user_reminder_settings: {
                        frequency: 'weekly',
                    },
                },
            }
        ];

        (reminderRepository.getDueReminders as jest.Mock).mockResolvedValue(mockReminders);

        const res = await request(app).get('/api/tips');

        // 🐞 עזר לדיבוג אם צריך
        // console.log('Response:', JSON.stringify(res.body, null, 2));

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockReminders);
        expect(reminderRepository.getDueReminders).toHaveBeenCalledTimes(1);
    });

    test('GET /api/tips (500) מחזיר שגיאה במקרה של שגיאה ב-reminderRepository', async () => {
        (reminderRepository.getDueReminders as jest.Mock).mockRejectedValueOnce(
            new Error('Database error')
        );

        const res = await request(app).get('/api/tips');

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'שגיאה בשרת' });
        expect(reminderRepository.getDueReminders).toHaveBeenCalledTimes(1);
    });
});
