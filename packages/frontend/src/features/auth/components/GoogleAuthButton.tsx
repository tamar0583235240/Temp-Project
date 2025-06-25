import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/userSlice';
import { useAuthWithGoogleMutation } from '../../../shared/api/userApi';

const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';

const GoogleAuthButton = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authWithGoogle] = useAuthWithGoogleMutation();

  const onSuccess = (googleUser: any) => {
    const token = googleUser.credential;

    authWithGoogle(token)
      .unwrap()
      .then((res) => {
        const user = res.user;

        dispatch(setCurrentUser(user));
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('role', user.role || 'student');
        sessionStorage.setItem('firstName', user.firstName || '');
        sessionStorage.setItem('lastName', user.lastName || '');
        sessionStorage.setItem('email', user.email || '');

        navigate('/welcome');
      })
      .catch((error: any) => {
        console.error('Google auth error:', error);
        MySwal.fire({
          title: 'שגיאה',
          text: 'התחברות נכשלה',
          icon: 'error',
          confirmButtonText: 'אישור',
        });
      });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          MySwal.fire({
            title: 'שגיאה',
            text: 'לא ניתן להתחבר עם חשבון Google',
            icon: 'error',
            confirmButtonText: 'אישור',
          });
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;