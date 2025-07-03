
import { useLoginMutation } from "../../../shared/api/authApi";
import { useAppDispatch } from "../../../shared/hooks/reduxHooks";
import { loginSuccess, loginStart, loginFailure } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { CardSimple } from "../../../shared/ui/card";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import GoogleLoginButton from "./GoogleAuthButton";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isError, isSuccess, error, data, isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setErrorMessage("");
    try {
      const res = await login({ email, password }).unwrap();
      setTempEmail(email);
      setShowValidation(true);
      successfulLogin(res);
    } catch (err: any) {
      const message = err?.data?.message || "שגיאה בהתחברות";
      dispatch(loginFailure(message));
      setErrorMessage(message);
      setShowValidation(false);
    }
  };
  const successfulLogin = (res: any) => {
    if (res?.user && res?.token) {
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      navigate("/home");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <CardSimple className="w-full max-w-md p-6 animate-fade-in space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-text-main text-center">התחברות</h2>
          {/* Email */}
          <div className="relative">
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {/* <IconWrapper size="sm" color="muted">
                <FaEnvelope />
              </IconWrapper> */}
            </div>
            <Input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-10"
              required
            />
          </div>
          {/* Password */}
          <div className="relative">
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {/* <IconWrapper size="sm" color="muted">
                <FaLock />
              </IconWrapper> */}
            </div>
            <Input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
              required
            />
          </div>
          {/* Remember Me + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-background"
              />
              זכור אותי
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-primary-dark hover:underline"
            >
              שכחתי סיסמה
            </button>
          </div>
          {/* Submit Button */}
          <Button type="submit" isLoading={isLoading} fullWidth>
            התחבר
          </Button>
          {/* Feedback */}
          {errorMessage && (
            <p className="text-danger text-sm text-center">{errorMessage}</p>
          )}
          {isSuccess && showValidation && (
            <p className="text-success text-sm text-center">התחברת בהצלחה!</p>
          )}
          {/* Divider */}
          <div className="border-t border-border my-2" />
          {/* Google Login */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-text-secondary">או התחבר עם:</p>
            <GoogleLoginButton />
          </div>
          {/* Signup link */}
          <p className="text-sm text-center mt-4">
            עדיין לא רשום?{" "}
            <a href="/signup" className="text-primary-dark hover:underline">
              הרשם
            </a>
          </p>
        </form>
      </CardSimple>
    </div>
  );
}