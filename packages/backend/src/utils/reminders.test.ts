import request from 'supertest';
import app from '../../app';
import reminderRepository from '../reposioty/reminderRepository';
import {pool} from '../config/dbConnection'; 

jest.mock('../reposioty/reminderRepository');
console.log(typeof reminderRepository.getDueReminders);


describe('בדיקות ל-reminderController', () => {
    afterEach(() => {
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
            },
            {
                id: '2',
                content: 'טיפ 2',
                last_sent_at: '2024-01-10T00:00:00Z',
                user: {
                    user_reminder_settings: {
                        frequency: 'daily',
                    },
                },
            },
        ];

        (reminderRepository.getDueReminders as jest.Mock).mockResolvedValue(mockReminders);

        const res = await request(app).get('/api/tips');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockReminders);
        expect(reminderRepository.getDueReminders).toHaveBeenCalledTimes(1);
    });
});
test('GET /api/tips (500) מחזיר שגיאה במקרה של שגיאה ב-reminderRepository', async () => {
    (reminderRepository.getDueReminders as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
    const res = await request(app).get('/api/tips');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'שגיאה בשרת' });
    expect(reminderRepository.getDueReminders).toHaveBeenCalledTimes(1);
});

afterAll(async () => {
  await pool.end();
});