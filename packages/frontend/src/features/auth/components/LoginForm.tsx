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
  const [login, { isError, isSuccess, error, data }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

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
        <button type="submit">התחבר</button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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

      {showValidation && (
        <CodeVerificationScreen email={tempEmail} onSuccess={successfulLogin} />
      )}
    </div>
  );
}

export default LoginForm;
