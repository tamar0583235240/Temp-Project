import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/userSlice';
import { useLoginWithGoogleMutation } from '../../../shared/api/user.api';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  const showError = (message = 'שגיאה בהתחברות') => {
    MySwal.fire({
      title: 'שגיאה',
      text: message,
      icon: 'error',
      confirmButtonText: 'אישור',
    });
  };

  const onSuccess = (googleUser: any) => {
    const token = googleUser.credential;

    loginWithGoogle(token)
      .unwrap()
      .then((response) => {
        const user = response.user;

        MySwal.fire({
          title: 'התחברת בהצלחה',
          icon: 'success',
          confirmButtonText: 'אישור',
        });

        dispatch(setCurrentUser(user));
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('userType', user.userType?.description || 'unknown');
        sessionStorage.setItem('firstName', user.firstName || '');
        sessionStorage.setItem('lastName', user.lastName || '');
        sessionStorage.setItem('email', user.email || '');

        if (user.userType?.description === 'לקוח') {
          navigate('/quickActions');
        } else {
          navigate('/leads');
        }
      })
      .catch((error: any) => {
        if (error.status === 404) {
          MySwal.fire({
            title: 'משתמש לא נמצא',
            text: 'נראה שאין משתמש עם המייל הזה. נעביר אותך להרשמה.',
            icon: 'info',
            confirmButtonText: 'המשך',
          }).then(() => {
            navigate('/register');
          });
        } else {
          showError();
        }
      });
  };

  return (
    <div className="login">
      <p style={{ marginTop: '110px' }}>התחברות למערכת</p>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <GoogleOAuthProvider clientId={clientId}>
          <div className="custom-google-login-button">
            <GoogleLogin onSuccess={onSuccess} onError={() => showError()} />
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
