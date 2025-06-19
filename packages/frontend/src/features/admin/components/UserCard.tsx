import React from 'react';
import { User } from '../types/userTypes';

interface Props {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
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
        </p>
        <p>{user.email}</p>
        <p>{user.phone || 'אין טלפון'}</p>
      </div>

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
          מחק
        </button>
      </div>
    </div>
  );
};

export default UserCard;