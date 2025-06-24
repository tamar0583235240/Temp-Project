import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useCreateUserMutation } from '../services/adminApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createRoot } from 'react-dom/client';
import { userSchema } from '../validation/userSchema';


const MySwal = withReactContent(Swal);

const AddUserWithSwal: React.FC = () => {
  const [createUser] = useCreateUserMutation();

  const handleAddUserClick = () => {
    MySwal.fire({
      title: 'הוספת משתמש חדש',
      html: '<div id="swal-form"></div>',
      didOpen: () => {
        const container = document.getElementById('swal-form');
        if (container) {
          const root = createRoot(container);
          root.render(<SwalForm createUser={createUser} />);
        }
      },
      showConfirmButton: false,
    });
  };

  return (
    <button onClick={handleAddUserClick} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
      הוסף משתמש
    </button>
  );
};

const SwalForm: React.FC<{ createUser: any }> = ({ createUser }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    try {
      await createUser(data).unwrap();
      Swal.close();
      Swal.fire('נוסף!', 'המשתמש נוסף בהצלחה', 'success');
      reset();
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'הייתה שגיאה בהוספת המשתמש';
      Swal.fire('שגיאה', errorMsg, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input {...register('firstName')} placeholder="שם פרטי" />
      <span style={{ color: 'red' }}>{errors.firstName?.message}</span>

      <input {...register('lastName')} placeholder="שם משפחה" />
      <span style={{ color: 'red' }}>{errors.lastName?.message}</span>

      <input {...register('email')} placeholder="אימייל" />
      <span style={{ color: 'red' }}>{errors.email?.message}</span>

      <input {...register('password')} placeholder="סיסמה" type="type" />
      <span style={{ color: 'red' }}>{errors.password?.message}</span>

      <input {...register('phone')} placeholder="טלפון" />
      <span style={{ color: 'red' }}>{errors.phone?.message}</span>

      <select {...register('role')}>
        <option value="">בחר תפקיד</option>
        <option value="student">תלמיד</option>
        <option value="manager">מנהל</option>
      </select>
      <span style={{ color: 'red' }}>{errors.role?.message}</span>

      <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px', border: 'none', borderRadius: '4px' }}>
        שמור
      </button>
    </form>
  );
};

export default AddUserWithSwal;
