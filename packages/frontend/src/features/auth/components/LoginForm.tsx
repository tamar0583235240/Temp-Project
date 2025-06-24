import React, { useState } from 'react';
import { useLoginMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess, loginStart, loginFailure } from '../store/authSlice';
import GoogleLoginButton from './GoogleAuthButton';
import './LoginForm.css';
import CodeVerificationScreen from './CodeVerificationScreen';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isError, isSuccess, error, data, isLoading}] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setErrorMessage('');

    try {
      const res = await login({ email, password }).unwrap();
      setTempEmail(email);
      setShowValidation(true);
    } catch (err: any) {
      const message = err?.data?.message || 'שגיאה בהתחברות';
      dispatch(loginFailure(message));
      setErrorMessage(message);
      setShowValidation(false);
    }
  };

  const successfulLogin = () => {
    if (data?.user && data?.token) {
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate('/');
    }
  };

  return (
    <div>
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
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          זכור אותי
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'מתחבר...' : 'התחבר'}
        </button>
        <button type="button" onClick={() => navigate('/forgot-password')}>
          שכחתי סיסמה
        </button>
        {isError && (
          <p style={{ color: 'red' }}>
            {(error as any)?.data?.message || 'משהו השתבש'}
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
}

export default LoginForm;
