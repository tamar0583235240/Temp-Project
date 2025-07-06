
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { loginWithGoogle } from '../api/api';
const clientId = "973113429052-nthdieqjkfm3jpgkvakja07gu7d50t8h.apps.googleusercontent.com";
const GoogleAuthButton = ({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) => {
  const MySwal = withReactContent(Swal);

  const onSuccess = (googleUser: any) => {
    const token = googleUser.credential;

    loginWithGoogle(token)
      .then((res) => {
        console.log("Google auth success:", res);
        onLoginSuccess(res);
      })
      .catch((error) => {
        console.log('Google auth error:', error);
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