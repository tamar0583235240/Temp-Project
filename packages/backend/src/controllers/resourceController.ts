// import { Request, Response } from 'express';
// import { getAllRecordingsFromCloudinary } from '../reposioty/RecordingsRepository';


// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// export const uploadRecording = async (req: Request, res: Response) => {
// export const getAllRecordingsController = async (req: Request, res: Response) => {
//   try {
//     const result = await getAllRecordingsFromCloudinary();

//     switch (result.status) {
//       case 200:
//         return res.status(200).json({ success: true, data: result.data });

//       case 400:
//         return res.status(400).json({ error: true, message: 'Bad request to Cloudinary' });

//       case 401:
//         return res.status(401).json({ error: true, message: 'Unauthorized - check API credentials' });

//       case 500:
//         return res.status(500).json({ error: true, message: 'Cloudinary internal error' });

//       default:
//         return res.status(result.status).json({ error: true, message: `Unexpected status: ${result.status}` });
//     }
//   } catch (error: any) {
//     console.error('Controller error:', error.message);
//     return res.status(500).json({ error: true, message: error.message });
//   }
// };
import { Request, Response } from 'express';
import { getAllRecordingsFromCloudinary } from '../reposioty/RecordingsRepository';
import { v2 as cloudinary } from 'cloudinary';

// הגדרת קונפיגורציה של Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Controller להעלאת הקלטה (עדיין לא ממומש – הוסיפי את הלוגיקה)
export const uploadRecording = async (req: Request, res: Response) => {
  try {
    // כאן תכתבי את הקוד שמעלה ל-Cloudinary
    res.status(200).json({ success: true, message: 'Upload logic not implemented yet' });
  } catch (error: any) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

// Controller לשליפת כל ההקלטות
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
