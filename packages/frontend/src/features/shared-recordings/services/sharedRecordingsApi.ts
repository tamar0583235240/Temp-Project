import { api } from '../../../shared/api/api';
import { SharedRecording } from '../types/types';
import { feedbackType } from '../../feedback/types/feedbackType';

export interface SharedRecordingDetails extends SharedRecording {
  feedback?: feedbackType | null;
}

export const sharedRecordingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // שליפת כל ההקלטות ששיתפו עם משתמש
    getSharedRecordings: builder.query<SharedRecording[], string>({
      query: (userId) => `/shared-recordings?userId=${userId}`,
      providesTags: ['SharedRecordings'],
    }),

    // שליפת פרטי הקלטה בודדת כולל פידבק
    getRecordingDetails: builder.query<SharedRecordingDetails, string>({
      query: (recordingId) => `/shared-recordings/details/${recordingId}`,
      providesTags: ['SharedRecordings', 'Feedback'],
    }),
  }),
});

export const {
  useGetSharedRecordingsQuery,
  useGetRecordingDetailsQuery,
} = sharedRecordingsApi;
