import axios from 'axios';

export const LoginWithGoogle = (token: string) => {
  return axios.post('http://localhost:5000/auth/google-login', { payload: { credential: token } });
};

export const RegisterWithGoogle = (credential: string) => {
  return axios.post('http://localhost:5000/auth/google-register', {
    payload: { credential },
  });
};