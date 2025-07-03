import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLoginMutation } from '../api/api'; 
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/reduxHooks';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import GoogleLoginButton from './GoogleAuthButton';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [triggerLogin, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setError(null);

    try {
      const result = await triggerLogin({ email, password }).unwrap(); // { token, user }

      const { token, user } = result;

      // שמירה לפי 'זכור אותי'
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      dispatch(loginSuccess({ user, token }));
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login failed', err);
      dispatch(loginFailure('התחברות נכשלה'));
      setError('התחברות נכשלה, נסי שוב.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>התחברות</h2>

        <Input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="flex items-center gap-2 mt-2 mb-4">
          <Input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          זכור אותי
        </label>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'טוען...' : 'התחבר'}
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="google-auth-btn-wrapper mt-4">
          <GoogleLoginButton />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
