import request from 'supertest';
import app from '../../app';
import aiInsigthRepository from '../reposioty/aiInsigthRepository';

jest.mock('../reposioty/aiInsigthRepository');

describe('בדיקות ל־AI Insights Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/aiInsight מחזיר תובנות AI בהצלחה', async () => {
    const mockInsights = [
      {
        id: '1',
        answer_id: 'answer-1',
        text: 'זו תובנה חכמה',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        answer_id: 'answer-2',
        text: 'תובנה נוספת',
        created_at: new Date().toISOString(),
      },
    ];

    (aiInsigthRepository.getAiInsights as jest.Mock).mockResolvedValueOnce(mockInsights);

    const res = await request(app).get('/api/aiInsight');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockInsights);
    expect(aiInsigthRepository.getAiInsights).toHaveBeenCalledTimes(1);
  });

  test('GET /api/aiInsight מחזיר שגיאה כשהשליפה נכשלת', async () => {
    (aiInsigthRepository.getAiInsights as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/aiInsight');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(aiInsigthRepository.getAiInsights).toHaveBeenCalledTimes(1);
  });
});
