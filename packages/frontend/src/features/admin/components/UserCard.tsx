import React, { useState } from 'react';
import { user } from '../types/userTypes';

interface Props {
  user: user;
  onEdit: (user: user) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="rounded-xl p-4 flex flex-col bg-gray-100 h-full">
      <div className="flex items-center justify-start mb-4">
        <span
          className={`w-3.5 h-3.5 rounded-full mr-2 ${
            user.isActive ? 'bg-green-500' : 'border border-gray-500'
          }`}
          title={user.isActive ? 'פעיל' : 'לא פעיל'}
        ></span>
        <span>{user.isActive ? 'פעיל' : 'לא פעיל'}</span>
      </div>

      <div className="flex-grow">
        <p className="text-center">
          <span className="font-mono tracking-widest">
            {showPassword ? user.password : '••••••••'}
          </span>
          <button
            className="ml-2 text-blue-600 hover:underline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'הסתר' : 'הצג'}
          </button>
        </p>
        <p><strong>{user.firstName} {user.lastName}</strong></p>
        <p>{user.email}</p>
        <p>{user.phone || 'אין טלפון'}</p>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => onEdit(user)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          עדכן
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          מחק
        </button>
      </div>
    </div>
  );
};

export default UserCard;