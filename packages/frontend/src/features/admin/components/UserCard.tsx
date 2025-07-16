<<<<<<< HEAD
import React from 'react';
import { User } from '../types/userTypes';

interface Props {
  user: User;
  onEdit: (user: User) => void;
=======
import React, { useState } from 'react';
import { user } from '../types/userTypes';
import { Eye, EyeOffIcon, Trash2, Pencil } from 'lucide-react';

interface Props {
  user: user;
  onEdit: (user: user) => void;
>>>>>>> Activity-Monitoring
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
<<<<<<< HEAD
  return (
    <div
      style={{
        // border: '1px solid #ccc',
        borderRadius: 12,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* ראש הכרטיס: סטטוס בצד שמאל */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            direction: 'rtl',
          }}
        >
          <span
            title={user.isActive ? 'פעיל' : 'לא פעיל'}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: user.isActive ? 'green' : 'transparent',
              border: user.isActive ? 'none' : '1px solid gray',
              display: 'inline-block',
              marginLeft: 6,
            }}
          />
          <span>{user.isActive ? 'פעיל' : 'לא פעיל'}</span>
        </div>
      </div>

      {/* פרטי המשתמש במרכז */}
      <div style={{ flexGrow: 1 }}>
        <p>ID: {user.id}</p>
        <p>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
=======
  const [showPassword, setShowPassword] = useState(false);

  return (
    // <div className="rounded-xl p-4 flex flex-col bg-white shadow-md h-full">
    <div className="rounded-xl p-4 flex flex-col bg-white shadow-md h-full transition duration-300 ease-in-out hover:scale-105">

      <div className="flex items-center mb-4">
        <span
          className={`w-3.5 h-3.5 rounded-full mr-2 ${user.isActive ? 'bg-green-500' : 'border border-gray-400'
            }`}
          title={user.isActive ? '' : ''}
        />
        <span>{user.isActive ? '' : ''}</span>
      </div>

      <div className="flex-grow text-center">

        {user.role === 'manager' && (
          <p className="mb-1 text-sm text-gray-500">מנהל</p>
        )}

        <p className="flex items-center justify-center gap-2">
          <span className="font-mono tracking-widest select-text">
            {showPassword ? user.password : '••••••••'}
          </span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
            className="text-primary-dark hover:text-primary-dark/80 transition"
            type="button"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
          </button>
        </p>

        <p className="font-semibold">
          {user.firstName} {user.lastName}
>>>>>>> Activity-Monitoring
        </p>
        <p>{user.email}</p>
        <p>{user.phone || 'אין טלפון'}</p>
      </div>

<<<<<<< HEAD
      {/* כפתורי עדכן ומחק במרכז בתחתית */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <button
          onClick={() => onEdit(user)}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 3px 6px rgba(0,123,255,0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          עדכן
        </button>

        <button
          onClick={() => onDelete(user.id)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 3px 6px rgba(220,53,69,0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a71d2a')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
        >
=======
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => onEdit(user)}
          className="bg-primary-dark text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark/90 transition flex items-center gap-2"
          type="button"
        >
          <Pencil size={18} />
          עדכן
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-danger text-white px-5 py-2.5 rounded-lg hover:bg-danger/90 transition flex items-center gap-2"
          type="button"
        >
          <Trash2 size={18} />
>>>>>>> Activity-Monitoring
          מחק
        </button>
      </div>
    </div>
  );
};

export default UserCard;
