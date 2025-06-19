// src/features/auth/LoginForm.tsx
import { useState, useEffect } from 'react';
import { useLoginMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess } from '../store/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();

  const [login, { data, isLoading, isError, error, isSuccess }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  useEffect(() => {
    if (data?.user && data?.token) {
      dispatch(loginSuccess(data));

      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } 
      else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
    }
  }, [data, dispatch]);

  return (
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'מתחבר...' : 'התחבר'}
      </button>

      <input
        type="checkbox"
        placeholder='זכור אותי'
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      {isError && <p style={{ color: 'red' }}>שגיאה: {(error as any)?.data?.message || 'משהו השתבש'}</p>}
      {isSuccess && <p>התחברת בהצלחה!</p>}
    </form>
  );
};

export default LoginForm;
