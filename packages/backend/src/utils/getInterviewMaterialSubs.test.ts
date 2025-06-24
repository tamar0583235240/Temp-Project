import request from 'supertest';
import app from '../../app'; 
import { pool } from '../config/dbConnection';

jest.mock('../config/dbConnection', () => {
  const mClient = {
    query: jest.fn(),
  };
  return { pool: mClient };
});

describe('בדיקות ל־InterviewMaterialSub Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/interviewMaterialSub מחזיר 200 עם נתונים תקינים', async () => {
    const mockData = [
      {
        id: 1,
        title: 'מבני נתונים',
        category_id: 3,
        created_at: new Date().toISOString()
      },
    ];

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockData });

    const res = await request(app).get('/api/interviewMaterialSub');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('מבני נתונים');
  });

  test('GET /api/interviewMaterialSub מחזיר 500 אם יש שגיאה', async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/interviewMaterialSub');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/interviewMaterialSub מחזיר 400 אם הבקשה לא חוקית (מדומה)', async () => {
    // לדוגמה – אם את מוסיפה קוד שדורש query param מסוים
    const res = await request(app).get('/api/interviewMaterialSub?badParam=1');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Bad request');
  });

  test('GET /api/interviewMaterialSub מחזיר 300 (מדומה)', async () => {
    const res = await request(app)
      .get('/api/interviewMaterialSub')
      .set('x-test-redirect', 'true');

    expect(res.status).toBe(300);
    expect(res.body).toHaveProperty('info', 'Multiple choices');
  });

});
