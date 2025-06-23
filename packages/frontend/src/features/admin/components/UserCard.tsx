import { user } from '../types/userTypes';
import React, { useState } from 'react';

interface Props {
  user: user;
  onEdit: (user: user) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        borderRadius: 12,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f9f9f9',
      }}
    >
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

      <div style={{ flexGrow: 1 }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <strong></strong>
          <span style={{ fontFamily: 'monospace', letterSpacing: '0.2em' }}>
            {showPassword ? user.password : '••••••••'}
          </span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
            }}
            aria-label={showPassword ? 'הסתר סיסמה' : 'הראה סיסמה'}
            title={showPassword ? 'הסתר סיסמה' : 'הראה סיסמה'}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5 0-9-4-9-8a10.07 10.07 0 0 1 3.06-6.06"></path>
                <path d="M1 1l22 22"></path>
                <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"></path>
                <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24"></path>
              </svg>
            )}
          </button>
        </p>

        <p>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </p>
        <p>{user.email}</p>
        <p>{user.phone || 'אין טלפון'}</p>
      </div>

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
          מחק
        </button>
      </div>
    </div>
  );
};

export default UserCard;

