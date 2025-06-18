import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { user } from '../types/userTypes';

// 1. נגדיר את הטיפוס לפי מה שמצפה yup ו-TS, עם phone שיכול להיות string | undefined | null
type UserFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  password: string;
  role: 'student' | 'manager';
};

// 2. נגדיר סכמה שתאפשר phone להיות string, undefined או null
const schema: yup.ObjectSchema<UserFormFields> = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().nullable().notRequired().matches(/^\d*$/, 'Phone number must contain only digits'),
  password: yup.string().matches(/^(?=.*[A-Za-z\u0590-\u05FF])(?=.*\d)[A-Za-z\u0590-\u05FF\d]{6,}$/, 'Password must include letters (English or Hebrew) and numbers, at least 6 characters').required('Password is required'),
  role: yup.mixed<UserFormFields['role']>().oneOf(['student', 'manager'], 'Invalid role').required('Role is required'),
});

// 3. רכיב הטופס
interface Props {
  user: user;
  onSubmit: (data: Partial<user>) => Promise<void>;
}

const UserUpdateForm: React.FC<Props> = ({ user, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormFields>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? null, // מתאימים ל-null
      password: '',
      role: (user.role as UserFormFields['role']) || 'student', // המרה בטוחה
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitAndClose: SubmitHandler<UserFormFields> = async (data) => {
    // 4. הופכים את המידע לטיפוס Partial<user> עם תיאום תפקיד
    const preparedData: Partial<user> = {
      ...user,
      ...data,
      role: data.role === 'manager' ? 'manager' : data.role, // אפשר כאן עוד התאמות לפי טיפוס user שלך
      phone: data.phone === null ? undefined : data.phone, // כדי למנוע null במקום undefined
    };

    await onSubmit(preparedData);
    Swal.close();
  };

  return (
    <form onSubmit={handleSubmit(submitAndClose)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 300 }}>
      <input {...register('firstName')} placeholder="שם פרטי" />
      {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}

      <input {...register('lastName')} placeholder="שם משפחה" />
      {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}

      <input {...register('email')} placeholder="אימייל" />
      {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}

      <input {...register('phone')} placeholder="טלפון" />
      {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}

      <input {...register('password')} type="password" placeholder="סיסמה" />
      {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}

      <select {...register('role')}>
        <option value="">בחר תפקיד</option>
        <option value="student">תלמיד</option>
        <option value="manager">מנהל</option>
      </select>
      {errors.role && <span style={{ color: 'red' }}>{errors.role.message}</span>}

      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        שמירה
      </button>
    </form>
  );
};

export default UserUpdateForm;
