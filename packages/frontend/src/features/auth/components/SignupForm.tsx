import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess } from '../store/authSlice';

const SignupForm = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [signup, { data, isLoading, isError, isSuccess, error }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(form);
  };

  useEffect(() => {
    if (data?.user && data?.token) {
      dispatch(loginSuccess(data));
    }
  }, [data, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>הרשמה</h2>
      <input name="firstName" placeholder="שם פרטי" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="שם משפחה" value={form.lastName} onChange={handleChange} required />
      <input name="email" placeholder="אימייל" value={form.email} onChange={handleChange} required />
      <input name="password" placeholder="סיסמה" type="password" value={form.password} onChange={handleChange} required />
      <button type="submit" disabled={isLoading}>{isLoading ? 'נרשם...' : 'הרשמה'}</button>
      {isError && <p style={{ color: 'red' }}>שגיאה: {(error as any)?.data?.message || 'משהו השתבש'}</p>}
      {isSuccess && <p>נרשמת בהצלחה!</p>}
    </form>
  );
};

export default SignupForm;
