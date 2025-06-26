import React, { useState } from 'react';
import { user } from '../types/userTypes';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  user: user;
  onEdit: (user: user) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="rounded-xl p-4 flex flex-col bg-white shadow-md h-full">
      <div className="flex items-center mb-4">
        <span
          className={`w-3.5 h-3.5 rounded-full mr-2 ${
            user.isActive ? 'bg-green-500' : 'border border-gray-400'
          }`}
          title={user.isActive ? '' : ''}
        />
        <span>{user.isActive ? '' : ''}</span>
      </div>

      <div className="flex-grow text-center">
        {/* תווית "מנהל" אפורה */}
        {user.role === 'manager' && (
          <p className="mb-1 text-sm text-gray-500">מנהל</p>
        )}

        {/* שורה של סיסמה עם כפתור */}
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
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </p>

        <p className="font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
        <p>{user.phone || 'אין טלפון'}</p>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => onEdit(user)}
          className="bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary-dark/90 transition"
          type="button"
        >
          עדכן
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger/90 transition"
          type="button"
        >
          מחק
        </button>
      </div>
    </div>
  );
};

export default UserCard;
