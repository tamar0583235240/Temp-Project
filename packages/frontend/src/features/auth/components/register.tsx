import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useRegisterWithGoogleMutation } from '../../../shared/api/user.api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/userSlice';

const Register = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';
  const [registerWithGoogle] = useRegisterWithGoogleMutation();

  const onSuccess = (googleUser: any) => {
    const token = googleUser.credential;

    registerWithGoogle(token)
      .unwrap()
      .then((res) => {
        const user = res.user;

        MySwal.fire({
          title: 'הצלחה',
          text: 'נרשמת בהצלחה!',
          icon: 'success',
          confirmButtonText: 'אישור',
        });

        dispatch(setCurrentUser(user));
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('role', user.role || 'student');
        sessionStorage.setItem('firstName', user.firstName || '');
        sessionStorage.setItem('lastName', user.lastName || '');
        sessionStorage.setItem('email', user.email || '');

        navigate('/welcome');
      })
      .catch((error: any) => {
        if (error.status === 409) {
          MySwal.fire({
            title: 'משתמש כבר קיים',
            text: 'כבר קיים משתמש עם המייל הזה. נעביר אותך להתחברות.',
            icon: 'info',
            confirmButtonText: 'המשך',
          }).then(() => {
            navigate('/login');
          });
        } else {
          MySwal.fire({
            title: 'שגיאה',
            text: 'הרישום נכשל',
            icon: 'error',
            confirmButtonText: 'אישור',
          });
        }
      });
  };

  return (
    <div>
      <h2>הרשמה</h2>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            MySwal.fire({
              title: 'שגיאה',
              text: 'הרישום נכשל',
              icon: 'error',
              confirmButtonText: 'אישור',
            });
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Register;
