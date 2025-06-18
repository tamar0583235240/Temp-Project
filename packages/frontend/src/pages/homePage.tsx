import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  role: string;
}

interface HomePageProps {
  user: User;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const navigate = useNavigate();
  const isManager = user.role === 'manager';

  return (
    <div dir="rtl" style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>ברוכים הבאים, {user.name}!</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => navigate('/simulation')} style={{ marginRight: 10 }}>
          start simulation
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ marginRight: 10 }}>
          dashboard
        </button>
        <button onClick={() => navigate('/resources')} style={{ marginRight: 10 }}>
          resources
        </button>
        <button onClick={() => navigate('/recordings')} style={{ marginRight: 10 }}>
          recordings
        </button>
        <button onClick={() => navigate('/shared')}>
          shared
        </button>
      </div>
      {isManager && (
        <div>
          <h2>Admin Panel</h2>
          <button onClick={() => navigate('/admin/questions')} style={{ marginRight: 10 }}>
            questions
          </button>
          <button onClick={() => navigate('/admin/resources')} style={{ marginRight: 10 }}>
            resources
          </button>
          <button onClick={() => navigate('/admin/users')} >
            users
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
