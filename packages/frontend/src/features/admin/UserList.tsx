// ✅ UserList.tsx - גרסה מלאה עם RTK Query כולל חיפוש וסינון סטטוס

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UserCard from './components/UserCard';
import AddUserWithSwal from './components/AddNewUser';
import { UploadUsers } from './components/UploadUsers';
import UserUpdateForm from './components/UserUpdateForm';
import { user } from './types/userTypes';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from './services/adminApi';

const MySwal = withReactContent(Swal);

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const filteredUsers = users.filter((user) => {
    const matchName =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchName && matchStatus;
  });

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
        Swal.fire('נמחק!', 'המשתמש נמחק בהצלחה.', 'success');
      } catch {
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
      await updateUser({ id: data.id, data }).unwrap();
      Swal.fire('עודכן!', 'הפרטים עודכנו בהצלחה.', 'success');
    } catch {
      Swal.fire('שגיאה', 'אירעה שגיאה בעדכון', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-8">רשימת משתמשים</h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
       <div className="flex flex-wrap gap-4 items-center rtl">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="חיפוש לפי שם..."
    className="px-4 py-2 border rounded-lg w-60 text-right"
  />

<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
  className="border rounded px-3 py-2 text-right appearance-none bg-no-repeat bg-[url('data:image/svg+xml;utf8,<svg fill=%22black%22 height=%2224%22 viewBox=%220 0 24 24%22 width=%2224%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')] bg-left"
  style={{ direction: 'rtl' }}
>
  <option value="all">הצג את כולם</option>
  <option value="active">משתמשים פעילים</option>
  <option value="inactive">משתמשים לא פעילים</option>
</select>

</div>


        <div className="flex gap-4 items-center">
          <AddUserWithSwal />
          <UploadUsers />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">טוען...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
