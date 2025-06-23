import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

export const getAllRecordingsFromCloudinary = async () => {
  try {

    const timestamp = Math.floor(Date.now() / 1000);

    // 🟢 חתימה מדויקת לפי Cloudinary
    const stringToSign = `timestamp=${timestamp}`;
    const signature = crypto.createHash('sha1').update(`${stringToSign}${API_SECRET}`).digest('hex');

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/video`;

    const response = await axios.get(url, {
      params: {
        timestamp,
        api_key: API_KEY,
        signature,
      },
    });

    return {
      status: response.status,
      data: response.data.resources,
    };
  } catch (error: any) {
    console.error('Cloudinary Error:', error.response?.data || error.message);

    return {
      status: error.response?.status || 500,
      error: true,
      message: error.message || 'Unknown error',
    };
  }
};

// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// export const getAllRecordingsFromCloudinary = async () => {
//   try {
//     const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/video`;

//     const response = await axios.get(url, {
//       auth: {
//         username: API_KEY!,
//         password: API_SECRET!,
//       },
//     });

//     return {
//       status: response.status,
//       data: response.data.resources,
//     };
//   } catch (error: any) {
//     return {
//       status: error.response?.status || 500,
//       error: true,
//       message: error.message || 'Unknown error',
//     };
//   }
// };
