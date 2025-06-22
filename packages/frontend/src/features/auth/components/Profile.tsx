// src/features/auth/Profile.tsx
import { useAppSelector } from '../../../shared/hooks/reduxHooks';

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

  if (!isLoggedIn) {
    return <p>אנא התחבר/י כדי לראות את הפרופיל שלך.</p>;
  }

  return (
    <div>
      <h2>פרופיל משתמש</h2>
      <p>שם: {user?.first_name} {user?.last_name}</p>
      <p>אימייל: {user?.email}</p>
      <p>טוקן: {token}</p>
    </div>
  );
};

export default Profile;
