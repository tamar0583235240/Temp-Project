import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../ProtectedRoute';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../../../features/auth/store/authSlice';

interface AuthState {
  user: any;
  token: string;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

// פונקציית עזר שמרנדרת עם Redux store ו־Router
function renderWithStore(authState: Partial<AuthState>) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: '',
        loggedIn: false,
        loading: false,
        error: null,
        isAdmin: false,
        ...authState, // מאפשר להעביר override
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/any-path']}>
        <ProtectedRoute>
          <div>תוכן מוגן</div>
        </ProtectedRoute>
      </MemoryRouter>
    </Provider>
  );
}

describe('ProtectedRoute', () => {
  test('מציג את התוכן כאשר המשתמש מחובר', () => {
    renderWithStore({ user: { name: 'User Test' }, loggedIn: true });

    expect(screen.getByText('תוכן מוגן')).toBeInTheDocument();
  });

  test('לא מציג את התוכן כאשר המשתמש לא מחובר', () => {
    renderWithStore({ user: null, loggedIn: false });

    expect(screen.queryByText('תוכן מוגן')).not.toBeInTheDocument();
  });
});
