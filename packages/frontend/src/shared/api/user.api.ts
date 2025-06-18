import { api } from './api';
import { User } from '../../features/auth/types/types';

interface GoogleCredentialPayload {
  credential: string;
}

interface GoogleResponse {
  user: User;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<GoogleResponse, string>({
      query: (token) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: { payload: { credential: token } },
      }),
    }),
    registerWithGoogle: builder.mutation<GoogleResponse, string>({
      query: (token) => ({
        url: '/auth/google-register',
        method: 'POST',
        body: { payload: { credential: token } },
      }),
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useRegisterWithGoogleMutation,
} = userApi;