import React from 'react';
import { useForm } from 'react-hook-form';
import { user } from '../types/userTypes';

interface Props {
  user: user;
  onSubmit: (data: Partial<user>) => void;
}

const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { register, handleSubmit } = useForm<Partial<user>>({
    defaultValues: user,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input {...register('firstName')} placeholder="שם פרטי" className="input" />
      <input {...register('lastName')} placeholder="שם משפחה" className="input" />
      <input {...register('email')} placeholder="אימייל" className="input" />
      <input {...register('phone')} placeholder="טלפון" className="input" />
      <button
        type="submit"
        className="bg-primary-dark text-white py-2 rounded-md hover:bg-primary-dark/90 transition"
      >
        שמור
      </button>
    </form>
  );
};

export default UserForm;
