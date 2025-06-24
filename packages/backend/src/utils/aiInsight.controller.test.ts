import request from 'supertest';
import app from '../../app';
import { pool } from '../config/dbConnection';

jest.mock('../config/dbConnection', () => {
  const mClient = {
    query: jest.fn(),
  };
  return { pool: mClient };
});

describe('בדיקות ל־AIInsight Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/aiInsight מחזיר את כל ה־AIInsights', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id: '1',
          summary: 'סיכום לדוגמה',
          rating: 5,
          strengths: 'חוזקות לדוגמה',
          improvements: 'שיפורים לדוגמה',
          answer_id: 'answer-1',
        },
      ],
    });

    const res = await request(app).get('/api/aiInsight');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].summary).toBe('סיכום לדוגמה');
    expect(res.body[0].rating).toBe(5);
  });

  test('GET /api/aiInsight עם שגיאת מסד מחזיר 500', async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/aiInsight');

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch('Failed to retrieve AIInsight from database');

});

});
