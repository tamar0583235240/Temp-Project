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
    <form
      onSubmit={handleSubmit(submitAndClose)}
      className="flex flex-col gap-4 min-w-[300px]"
    >
      <input {...register('firstName')} placeholder="שם פרטי" className="input" />
      {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}

      <input {...register('lastName')} placeholder="שם משפחה" className="input" />
      {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}

      <input {...register('email')} placeholder="אימייל" className="input" />
      {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}

      <input {...register('phone')} placeholder="טלפון" className="input" />
      {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}

      <input {...register('password')} type="text" placeholder="סיסמא" className="input" />
      {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}

      <select {...register('role')} className="input">
        <option value="">בחר תפקיד</option>
        <option value="student">תלמיד</option>
        <option value="manager">מנהל</option>
      </select>
      {errors.role && <span className="text-red-600 text-sm">{errors.role.message}</span>}

      <button
        type="submit"
        className="bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
      >
        שמירה
      </button>
    </form>
  );
};

export default UserUpdateForm;
