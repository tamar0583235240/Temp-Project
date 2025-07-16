import React from 'react';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
import { User } from '../types/userTypes';

interface Props {
  user: User;
  onSubmit: (data: Partial<User>) => void;
}

const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { register, handleSubmit } = useForm<Partial<User>>({
=======
import { user } from '../types/userTypes';

interface Props {
  user: user;
  onSubmit: (data: Partial<user>) => void;
}

const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { register, handleSubmit } = useForm<Partial<user>>({
>>>>>>> Activity-Monitoring
    defaultValues: user,
  });

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} placeholder="שם פרטי" />
      <input {...register('lastName')} placeholder="שם משפחה" />
      <input {...register('email')} placeholder="אימייל" />
      <input {...register('phone')} placeholder="טלפון" />
      <button type="submit">שמור</button>
=======
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input {...register('firstName')} placeholder="שם פרטי" className="input text-right" />
      <input {...register('lastName')} placeholder="שם משפחה" className="input text-right" />
      <input {...register('email')} placeholder="אימייל" className="input text-right" />
      <input {...register('phone')} placeholder="טלפון" className="input text-right" />
      <button
        type="submit"
        className="bg-primary-dark text-white py-2 rounded-md hover:bg-primary-dark/90 transition"
      >
        שמור
      </button>
>>>>>>> Activity-Monitoring
    </form>
  );
};

export default UserForm;
