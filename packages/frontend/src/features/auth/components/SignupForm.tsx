import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../../shared/api/authApi';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess } from '../store/authSlice';
import GoogleAuthButton from './GoogleAuthButton';

const SignupForm = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '', // אופציונלי, אפשר להוריד
  });

  const [signup, { data, isLoading, isError, isSuccess, error }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      <input name="phone" placeholder="טלפון" value={form.phone} onChange={handleChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'נרשם...' : 'הרשמה'}
      </button>
      {isError && <p style={{ color: 'red' }}>שגיאה: {(error as any)?.data?.message || 'משהו השתבש'}</p>}
      {isSuccess && <p style={{ color: 'green' }}>נרשמת בהצלחה!</p>}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>או הרשם עם:</p>
        <div style={{ width: '300px', margin: '0 auto' }}>
          <GoogleAuthButton />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
