import request from 'supertest';
import app from '../../app'
import reminderRepository from '../reposioty/reminderRepository';

jest.mock('../repository/reminderRepository');

describe('בדיקות ל-reminderController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/reminders (200) מחזיר רשימת טיפים בהצלחה', async () => {
        const mockTips = [
            { id: 1, text: 'טיפ 1' },
            { id: 2, text: 'טיפ 2' },
        ];

        (reminderRepository.getAllTips as unknown as jest.Mock).mockResolvedValueOnce(mockTips);

        const res = await request(app).get('/api/reminders');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockTips);
        expect(reminderRepository.getAllTips).toHaveBeenCalledTimes(1);
    });
});
