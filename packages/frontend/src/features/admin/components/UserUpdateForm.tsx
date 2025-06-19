
// components/UserUpdateForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../types/userTypes';
import Swal from 'sweetalert2';

interface Props {
  user: User;
  onSubmit: (data: Partial<User>) => Promise<void>;
}

const UserUpdateForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<User>>({
    defaultValues: user,
  });

  const submitAndClose = async (data: Partial<User>) => {
    await onSubmit(data);
    Swal.close();
  };

  return (
    <form
      onSubmit={handleSubmit(submitAndClose)}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 300 }}
    >
      <input {...register('firstName', { required: 'שם פרטי חובה' })} placeholder="שם פרטי" />
      {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}

      <input {...register('lastName', { required: 'שם משפחה חובה' })} placeholder="שם משפחה" />
      {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}

      <input
        {...register('email', {
          required: 'אימייל חובה',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'אימייל לא תקין',
          },
        })}
        placeholder="אימייל"
      />
      {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}

      <input {...register('phone')} placeholder="טלפון" />

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
        שמור
      </button>
    </form>
  );
};

export default UserUpdateForm;