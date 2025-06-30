
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';

const GoogleAuthButton = () => {
  const MySwal = withReactContent(Swal);

  const onSuccess = () => {
    console.error("function onSuccess called");
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