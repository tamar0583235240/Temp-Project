import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { userSchema } from '../validation/userSchema';
import { UserFormFields, user } from '../types/userTypes';
import { useCreateUserMutation } from '../services/adminApi';

const SwalForm = () => {
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormFields>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<UserFormFields> = async (data) => {
    const fullUser: user = {
      id: Math.random().toString(36).substring(2, 15),
      ...data,
      phone: data.phone || '',
      createdAt: new Date(),
      isActive: false,
    };

    try {
      await createUser(fullUser).unwrap();
      Swal.close();
      Swal.fire('נוסף!', 'המשתמש נוסף בהצלחה', 'success');
      reset();
    } catch (err: any) {
      console.error('שגיאה מהשרת:', err);

      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text:
          err?.data?.error ||
          err?.error ||
          err?.message ||
          'אירעה שגיאה בעת הוספת המשתמש',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-2">
      <input {...register('firstName')} placeholder="שם פרטי" />
      <span className="text-red-600 text-sm">{errors.firstName?.message}</span>

      <input {...register('lastName')} placeholder="שם משפחה" />
      <span className="text-red-600 text-sm">{errors.lastName?.message}</span>

      <input {...register('email')} placeholder="אימייל" />
      <span className="text-red-600 text-sm">{errors.email?.message}</span>

      <input {...register('password')} placeholder="סיסמה" type="password" />
      <span className="text-red-600 text-sm">{errors.password?.message}</span>

      <input {...register('phone')} placeholder="טלפון" />
      <span className="text-red-600 text-sm">{errors.phone?.message}</span>

      <select {...register('role')}>
        <option value="">בחר תפקיד</option>
        <option value="student">תלמיד</option>
        <option value="manager">מנהל</option>
      </select>
      <span className="text-red-600 text-sm">{errors.role?.message}</span>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        שמור
      </button>
    </form>
  );
};

export default SwalForm;
