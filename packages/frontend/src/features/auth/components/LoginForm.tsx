import React, { useState } from 'react';
import { useLoginMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setErrorMessage('');

    try {
      const res = await login({ email, password, rememberMe }).unwrap();

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // עדכון הסטייט בלבד (לא storage)
      dispatch(loginSuccess({ token: res.token, user: res.user }));

      // מעבר לעמוד הבית
      navigate('/home');

    } catch (err: any) {
      const message = err?.data?.message || 'שגיאה בהתחברות';
      dispatch(loginFailure(message));
      setErrorMessage(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
        />
        זכור אותי
      </label>
      <button type="submit">התחבר</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default LoginForm;
