// LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess } from '../store/authSlice';
import './LoginForm.css'; // חשוב!
import CodeVerificationScreen from './CodeVerificationScreen';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();

  const [login, { data, isLoading, isError, error, isSuccess }] = useLoginMutation();


  const [showValidation, setShowValidation] = useState(true);
  const [tempEmail, setTempEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    debugger;
    try{
    await login({ email, password }).unwrap().then((res) => {
      console.log('Login result:', res);
      if (res?.user && res?.token) {
        setShowValidation(true);
        setTempEmail(email);
      } else {
        setShowValidation(false);
      }
    });
  } catch (err) {
      console.error('Login error:', err);
      setShowValidation(false);
    }
  };

  const successfulLogin = () => {
    if (data?.user && data?.token) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', data.token);
    storage.setItem('user', JSON.stringify(data.user));

    dispatch(loginSuccess({ user: data.user, token: data.token }));
    navigate('/dashboard');
  }
  };

  useEffect(() => {
    if (data?.user && data?.token) {
      // dispatch(loginSuccess(data));

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
            onChange={(e) => setRememberMe(e.target.checked)}
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
      </form>
      {showValidation && (<CodeVerificationScreen email={tempEmail} onSuccess={successfulLogin}></CodeVerificationScreen>)}

    </div>
  );
};

export default LoginForm;
