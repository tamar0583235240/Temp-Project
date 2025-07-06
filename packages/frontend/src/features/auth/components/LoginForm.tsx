import React, { useState } from 'react';
import { useLoginMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess, loginStart, loginFailure } from '../store/authSlice';
import GoogleLoginButton from './GoogleAuthButton';
import CodeVerificationScreen from './CodeVerificationScreen';
import { useNavigate } from 'react-router-dom';
import { CardSimple } from '../../../shared/ui/card';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isError, isSuccess, error, data, isLoading }] =
    useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("🔵 Submitting login with:", email, password); // ✅✅

  dispatch(loginStart());
  setErrorMessage("");

  try {
    const res = await login({ email, password }).unwrap();
    console.log("🟢 Login response:", res); // ✅✅

    setTempEmail(email);
    setShowValidation(true);
    successfulLogin(res);
  } catch (err: any) {
    console.error("🔴 Login error:", err); // ✅✅

    const message = err?.data?.message || "שגיאה בהתחברות";
    dispatch(loginFailure(message));
    setErrorMessage(message);
    setShowValidation(false);
  }
};


  const successfulLogin = (res: any) => {
    if (res?.user && res?.token) {
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      navigate("/");
    }
  };

  return (
    <div>
      <CardSimple className="max-w-md w-full mx-auto p-6 space-y-4">
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
            />
            זכור אותי
          </label>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "מתחבר..." : "התחבר"}
          </Button>
          <Button type="button" onClick={() => navigate("/forgot-password")}>
            שכחתי סיסמה
          </Button>
          {isError && (
            <p style={{ color: "red" }}>
              {(error as any)?.data?.message || "משהו השתבש"}
            </p>
          )}
          {isSuccess && <p style={{ color: "green" }}>התחברת בהצלחה!</p>}

          <div className="google-auth-btn-wrapper">
            <p>או התחבר עם:</p>
            <GoogleLoginButton />
          </div>

          <p className="mt-4 text-center">
          <a  href="/signup" >עדיין לא רשום? הרשם</a> 
          </p>

        </form>
      </CardSimple>
    </div>
  );
}

export default LoginForm;
