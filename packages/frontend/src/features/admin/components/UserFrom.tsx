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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} placeholder="שם פרטי" />
      <input {...register('lastName')} placeholder="שם משפחה" />
      <input {...register('email')} placeholder="אימייל" />
      <input {...register('phone')} placeholder="טלפון" />
      <button type="submit">שמור</button>
    </form>
  );
};

export default UserForm;
