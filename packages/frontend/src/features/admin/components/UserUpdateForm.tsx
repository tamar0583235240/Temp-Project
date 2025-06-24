import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { user } from '../types/userTypes';
import { userSchema, UserFormFields } from '../validation/userSchema';

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
      phone: user.phone ?? '',
      password: user.password,
      role: user.role === 'manager' ? 'manager' : 'student',
    },
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const submitAndClose: SubmitHandler<UserFormFields> = async (data) => {
    const preparedData: Partial<user> = {
      ...user,
      ...data,
      phone: data.phone === '' ? undefined : data.phone,
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

      <input {...register('password')} type="text" placeholder="סיסמא" />
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
