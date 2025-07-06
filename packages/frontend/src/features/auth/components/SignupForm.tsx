import { useState, useRef } from "react";
import { useAppDispatch } from "../../../shared/hooks/reduxHooks";
import { loginSuccess } from "../store/authSlice";
import GoogleAuthButton from "./GoogleAuthButton";
import { CardSimple } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { useNavigate } from "react-router-dom";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function SignupForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  // const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [message, setMessage] = useState("");
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const code = codeDigits.join("");
  const requestSignupCode = async () => {
    setMessage("");
    setIsSuccessMsg(false);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/signup/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("קוד אימות נשלח למייל. אנא הזן את הקוד להמשך.");
        setIsSuccessMsg(true);
        setStep("verify");
      } else {
        setMessage(data.message || "שגיאה בשליחת הקוד");
      }
    } catch {
      setMessage("שגיאה בשליחת הבקשה. נסה שוב.");
    }
    setLoading(false);
  };
  const confirmSignup = async () => {
    setMessage("");
    setIsSuccessMsg(false);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/signup/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("ההרשמה הושלמה בהצלחה!");
        setIsSuccessMsg(true);
        dispatch(loginSuccess({user: data.user, token: data.token}));
        navigate("/home");
      } else {
        setMessage(data.message || "קוד לא תקין, נסה שנית.");
      }
    } catch {
      setMessage("שגיאה באימות הקוד. נסה שנית.");
    }
    setLoading(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(paste)) {
      setCodeDigits(paste.split(""));
      inputsRef.current[5]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      const newDigits = [...codeDigits];
      newDigits[index - 1] = "";
      setCodeDigits(newDigits);
      inputsRef.current[index - 1]?.focus();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "form") {
      requestSignupCode();
    } else if (step === "verify") {
      if (code.length !== 6) {
        setMessage("נא להזין קוד בן 6 ספרות.");
        setIsSuccessMsg(false);
        return;
      }
      confirmSignup();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <CardSimple className="max-w-md w-full p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-text-main">הרשמה</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === "form" && (
            <>
              <Input name="first_name" placeholder="שם פרטי" value={form.first_name} onChange={handleChange} required />
              <Input name="last_name" placeholder="שם משפחה" value={form.last_name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} required />
              {/* שדה סיסמה עם הצג/הסתר */}
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="סיסמה"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pr-12"
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                  <IconWrapper size="sm" color="muted" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconWrapper>
                </div>
              </div>
              <Input name="phone" placeholder="טלפון (אופציונלי)" value={form.phone} onChange={handleChange} />
            </>
          )}
          {step === "verify" && (
            <>
              <p className="text-sm text-center text-muted-foreground">
                קוד אימות נשלח למייל: <b>{form.email}</b>
              </p>
              <div className="flex justify-between gap-2 text-center" dir="ltr">
                {codeDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el: HTMLInputElement | null) => {
                     inputsRef.current[i] = el;
                      }}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ))}
              </div>
              <Button type="button" variant="ghost" onClick={requestSignupCode} disabled={loading} className="w-full">
                שלח קוד מחדש
              </Button>
            </>
          )}
          <Button type="submit" isLoading={loading} fullWidth>
            {step === "form" ? "הרשם" : "אמת קוד"}
          </Button>
          {message && (
            <p
              className={`text-sm text-center ${
                isSuccessMsg ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          {step === "form" && (
            <div className="pt-2">
              <p className="text-center text-sm">או הרשם עם:</p>
              <div className="pt-2 flex justify-center">
                <GoogleAuthButton />
              </div>
            </div>
          )}
        </form>
      </CardSimple>
    </div>
  );
}