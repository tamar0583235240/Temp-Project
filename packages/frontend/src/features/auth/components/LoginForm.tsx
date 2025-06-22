import React, { useState, useEffect } from 'react';
import { useLoginMutation, useRefreshTokenMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess } from '../store/authSlice';
import './LoginForm.css';
import GoogleLoginButton from './GoogleAuthButton';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();

  const [login, { data, isLoading, isError, error, isSuccess }] = useLoginMutation();
  const [refreshToken] = useRefreshTokenMutation();

  const handleRememberMe = async (checked: boolean) => {
    setRememberMe(checked);
    if (checked) {
      try {
        const result = await refreshToken().unwrap();
        localStorage.setItem('token', result.token);
      } catch (err) {
        console.error('שגיאה ברענון טוקן:', err);
      }
    } else {
      localStorage.removeItem('token');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  useEffect(() => {
    if (data?.user && data?.token) {
      dispatch(loginSuccess(data));
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', data.token);
      storage.setItem('user', JSON.stringify(data.user));
    }
  }, [data, dispatch, rememberMe]);

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>התחברות</h2>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={async (e) => await handleRememberMe(e.target.checked)}
          />
          זכור אותי
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'מתחבר...' : 'התחבר'}
        </button>

        {isError && (
          <p style={{ color: 'red' }}>
            שגיאה: {(error as any)?.data?.message || 'משהו השתבש'}
          </p>
        )}
        {isSuccess && <p style={{ color: 'green' }}>התחברת בהצלחה!</p>}

        <div className="google-auth-btn-wrapper">
          <p>או התחבר עם:</p>
          <GoogleLoginButton />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
