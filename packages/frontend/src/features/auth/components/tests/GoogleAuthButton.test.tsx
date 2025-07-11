import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GoogleAuthButton from '../GoogleAuthButton';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/authSlice';
import userReducer from '../../store/userSlice';
import '@testing-library/jest-dom/extend-expect';

// מוקים ל־Google
const mockSuccessFire = jest.fn();
const mockErrorFire = jest.fn();

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  GoogleLogin: ({ onSuccess, onError }: any) => (
    <>
      <button onClick={() => onSuccess({ credential: 'mock-token' })}>Login with Google</button>
      <button onClick={onError}>Fail Google Login</button>
    </>
  ),
}));

jest.mock('sweetalert2', () => ({
  fire: mockErrorFire,
}));

jest.mock('sweetalert2-react-content', () => () => ({
  fire: mockSuccessFire,
}));

const mockSuccessAuth = jest.fn(() => ({
  unwrap: () => Promise.resolve({ user: { name: 'Test User' } }),
}));

const mockFailureAuth = jest.fn(() => ({
  unwrap: () => Promise.reject({ data: { message: 'שגיאה מהשרת' } }),
}));

jest.mock('../../../../shared/api/userApi', () => ({
  useAuthWithGoogleMutation: () => [mockSuccessAuth],
}));

// סט אפ חנות Redux
const renderWithProviders = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <GoogleAuthButton />
      </BrowserRouter>
    </Provider>
  );
};

describe('GoogleAuthButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('מציג כפתור התחברות עם Google', () => {
    renderWithProviders();
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  test('התחברות מוצלחת מפעילה את הקריאה ל־authWithGoogle', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText('Login with Google'));

    await waitFor(() => {
      expect(mockSuccessAuth).toHaveBeenCalledWith('mock-token');
      expect(mockSuccessFire).not.toHaveBeenCalled(); // לא אמור לפתוח מודאל שגיאה
    });
  });

  test('כישלון בהתחברות מציג הודעת שגיאה', async () => {
    // מחליפים את המוק לקריאה שמחזירה שגיאה
    (jest.requireMock('../../../../shared/api/userApi').useAuthWithGoogleMutation as any).mockReturnValueOnce([mockFailureAuth]);

    renderWithProviders();
    fireEvent.click(screen.getByText('Login with Google'));

    await waitFor(() => {
      expect(mockFailureAuth).toHaveBeenCalledWith('mock-token');
      expect(mockSuccessFire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'שגיאה',
          text: 'התחברות נכשלה',
          icon: 'error',
        })
      );
    });
  });

  test('כפתור כשלון מפעיל sweetalert לשגיאה כללית', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText('Fail Google Login'));

    await waitFor(() => {
      expect(mockSuccessFire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'שגיאה',
          text: 'לא ניתן להתחבר עם חשבון Google',
          icon: 'error',
        })
      );
    });
  });
});
