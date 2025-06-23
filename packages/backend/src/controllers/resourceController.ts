import { Request, Response } from 'express';
import { getAllRecordingsFromCloudinary } from '../reposioty/RecordingsRepository';

export const getAllRecordingsController = async (req: Request, res: Response) => {
  try {
    const result = await getAllRecordingsFromCloudinary();

    switch (result.status) {
      case 200:
        return res.status(200).json({ success: true, data: result.data });

      case 400:
        return res.status(400).json({ error: true, message: 'Bad request to Cloudinary' });

      case 401:
        return res.status(401).json({ error: true, message: 'Unauthorized - check API credentials' });

      case 500:
        return res.status(500).json({ error: true, message: 'Cloudinary internal error' });

      default:
        return res.status(result.status).json({ error: true, message: `Unexpected status: ${result.status}` });
    }
  } catch (error: any) {
    console.error('Controller error:', error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
};
