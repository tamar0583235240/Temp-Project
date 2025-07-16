<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createRoot } from 'react-dom/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import UserCard from './components/UserCardAdmin';
import AddUserWithSwal from './components/AddNewUserAdmin';
import { UploadUsers } from './components/UploadUsersAdmin';
import UserUpdateForm from './components/UserUpdateFormAdmin';
import { AdminUsersTitle } from './components/AdminQuestionsTitle';
import { user } from './types/userType';

import {
  useGetUsersQueryAdmin,
  useDeleteUserMutationAdmin,
  useUpdateUserMutationAdmin,
} from '../../shared/api/adminApi';

=======
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UserCard from './components/UserCard';
import AddUserWithSwal from './components/AddNewUser';
import { UploadUsers } from './components/UploadUsers';
import UserUpdateForm from './components/UserUpdateForm';
import { user } from './types/userTypes';
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation, } from './services/adminApi';
import { createRoot } from 'react-dom/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

>>>>>>> Activity-Monitoring
const MySwal = withReactContent(Swal);

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const {
    data: users = [],
    isLoading,
<<<<<<< HEAD
    isError,
    error,
  } = useGetUsersQueryAdmin();

  const [deleteUser] = useDeleteUserMutationAdmin();
  const [updateUser] = useUpdateUserMutationAdmin();

  useEffect(() => {
    if (isError) {
      console.error('❌ שגיאה בשליפת המשתמשים:', error);
    } else {
      console.log('✅ users data:', users);
    }
  }, [users, isError, error]);

  const filteredUsers = users.filter((user) => {
  const matchName =
  (user.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (user.lastName || '').toLowerCase().includes(searchTerm.toLowerCase());
=======
  } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const filteredUsers = users.filter((user) => {
    const matchName =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
>>>>>>> Activity-Monitoring

    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchName && matchStatus;
  });

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
<<<<<<< HEAD
      title: 'אתה בטוח?',
      text: 'המשתמש ימחק לצמיתות!',
=======
      title: '?אתה בטוח',
      text: '!המשתמש ימחק לצמיתות',
>>>>>>> Activity-Monitoring
      icon: 'warning',
      iconColor: '#64748B',
      showCancelButton: true,
      confirmButtonText: '!כן, מחק',
      cancelButtonText: 'בטל',
<<<<<<< HEAD
      confirmButtonColor: '#00B894',
=======
      confirmButtonColor: '#00B894'
>>>>>>> Activity-Monitoring
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
<<<<<<< HEAD
        Swal.fire('נמחק!', 'המשתמש נמחק בהצלחה', 'success');
      } catch {
        Swal.fire('שגיאה', 'אירעה שגיאה במחיקה', 'error');
      }
    }
  };
=======
        Swal.fire({
          title: '!נמחק',
          text: 'המשתמש נמחק בהצלחה',
          icon: 'success',
          iconColor: '#64748B',
          confirmButtonColor: '#00B894',
        });
      } catch {
        Swal.fire({
          title: 'שגיאה',
          text: 'אירעה שגיאה במחיקה',
          icon: 'error',
          iconColor: '#64748B',
          confirmButtonColor: '#64748B',
        });
      }
    }
  }
>>>>>>> Activity-Monitoring

  const handleEdit = async (user: user) => {
    await MySwal.fire({
      title: 'עדכון משתמש',
      html: '<div id="swal-update-form" style="direction: rtl; text-align: right;"></div>',
      showConfirmButton: false,
      showCloseButton: true,
      width: 400,
      didOpen: () => {
        const container = document.getElementById('swal-update-form');
        if (container) {
          const root = createRoot(container);
          root.render(<UserUpdateForm user={user} onSubmit={handleUpdate} />);
        }
      },
    });
  };

  const handleUpdate = async (data: Partial<user>) => {
    if (!data.id) return;
<<<<<<< HEAD

    try {
      await updateUser({ id: data.id, data }).unwrap();
      Swal.fire('עודכן!', 'הפרטים עודכנו בהצלחה', 'success');
    } catch {
      Swal.fire('שגיאה', 'אירעה שגיאה בעדכון', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-8">
        <AdminUsersTitle />
      </h2>

      {/* סינון וחיפוש */}
=======
    try {
      await updateUser({ id: data.id, data }).unwrap();
      Swal.fire({
        title: '!עודכן',
        text: 'הפרטים עודכנו בהצלחה',
        icon: 'success',
        iconColor: '#64748B',
        confirmButtonColor: '#00B894',
      });
    } catch {
      Swal.fire({
        title: 'שגיאה',
        text: 'אירעה שגיאה בעדכון',
        icon: 'error',
        iconColor: '#64748B',
        confirmButtonColor: '#e74c3c',
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-8">רשימת משתמשים</h2>

>>>>>>> Activity-Monitoring
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 rtl">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="border rounded px-3 py-2 w-40 text-right"
<<<<<<< HEAD
            dir="rtl"
=======
            dir="rtl"  // או style={{ direction: 'rtl' }}
>>>>>>> Activity-Monitoring
          >
            <option value="all">הצג את כולם</option>
            <option value="active">משתמשים פעילים</option>
            <option value="inactive">משתמשים לא פעילים</option>
          </select>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש לפי שם"
              className="px-4 py-2 border rounded-lg w-48 text-right pl-10"
              style={{ direction: 'rtl' }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <div className="rounded p-1" style={{ backgroundColor: '#00B894' }}>
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* העלאה והוספה */}
=======
>>>>>>> Activity-Monitoring
        <div className="flex gap-4 items-center">
          <UploadUsers />
          <AddUserWithSwal />
        </div>
      </div>

<<<<<<< HEAD
      {/* תוכן */}
      {isLoading ? (
        <p className="text-center">...טוען</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ direction: 'rtl' }}>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
=======
      {isLoading ? (
        <p className="text-center">...טוען</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          style={{ direction: 'rtl' }}
        >
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
>>>>>>> Activity-Monitoring
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
