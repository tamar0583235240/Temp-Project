import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState, useEffect } from 'react';
import { useUsers } from './hooks/useUsers';
import UserCard from './components/UserCard';
import UserUpdateForm from './components/UserUpdateForm';
import { user } from './types/userTypes';

const MySwal = withReactContent(Swal);

const UserList = () => {
  const { users: usersFromApi, isLoading, deleteUser, updateUser } = useUsers();
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    if (usersFromApi) {
      setUsers(usersFromApi);
    }
  }, [usersFromApi]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'אתה בטוח?',
      text: 'המשתמש ימחק לצמיתות!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן, מחק!',
      cancelButtonText: 'בטל',
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
        setUsers(prev => prev.filter(user => user.id !== id));
        Swal.fire('נמחק!', 'המשתמש נמחק בהצלחה.', 'success');
      } catch (error) {
        Swal.fire('שגיאה', 'אירעה שגיאה במחיקה', 'error');
      }
    }
  };

  const handleEdit = async (user: user) => {
    await MySwal.fire({
      title: 'עדכון משתמש',
      html: <UserUpdateForm user={user} onSubmit={handleUpdate} />,
      showConfirmButton: false,
      showCloseButton: true,
      width: '400px',
    });
  };

  const handleUpdate = async (data: Partial<user>) => {
    if (!data.id) return;
    try {
      const updated = await updateUser({ id: data.id, data }).unwrap();
      setUsers(prev => prev.map(u => (u.id === updated.id ? { ...u, ...updated } : u)));
      Swal.fire('עודכן!', 'הפרטים עודכנו בהצלחה.', 'success');
    } catch {
      Swal.fire('שגיאה', 'אירעה שגיאה בעדכון', 'error');
    }
  };

  if (isLoading) return <p style={{ textAlign: 'center' }}>טוען...</p>;

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>רשימת משתמשים</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {users.map(user => (
          <div key={user.id}>
            <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
