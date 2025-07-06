import React, { useState } from 'react';
import GoogleLoginButton from './GoogleAuthButton';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { login } from '../api/api';

function LoginForm({ onLoginSuccess }: { onLoginSuccess: (token:string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, seterror] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, rememberMe)
      .then((res) => {console.log(res);
       onLoginSuccess(res); })
      .catch(() => {
        seterror(true);
      });
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
        <label>
          <Input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />זכור אותי</label>
        <Button type="submit" >התחבר</Button>
        {error && <p style={{ color: "red" }}> {error}</p>}
        <div className="google-auth-btn-wrapper">
          <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
