// import React from 'react';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from '../store/userSlice';
// import { useAuthWithGoogleMutation } from '../../../shared/api/userApi';
// import { loginFailure, loginSuccess } from '../store/authSlice';

// const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';

// const GoogleAuthButton = () => {
//   const MySwal = withReactContent(Swal);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [authWithGoogle] = useAuthWithGoogleMutation();

//   const onSuccess = (googleUser: any) => {
//     const token = googleUser.credential;

//     authWithGoogle(token)
//       .unwrap()
//       .then((res) => {
//         const user = res.user;
//         console.log('Google user:', user);

//         dispatch(loginSuccess({ user: user, token: token }));

//         navigate('/');
//       })
//       .catch((error: any) => {
//         dispatch(loginFailure(error?.data?.message || 'שגיאה בהתחברות עם Google'));
//         console.error('Google auth error:', error);
//         MySwal.fire({
//           title: 'שגיאה',
//           text: 'התחברות נכשלה',
//           icon: 'error',
//           confirmButtonText: 'אישור',
//         });
//       });
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <GoogleLogin
//         onSuccess={onSuccess}
//         onError={() => {
//           MySwal.fire({
//             title: 'שגיאה',
//             text: 'לא ניתן להתחבר עם חשבון Google',
//             icon: 'error',
//             confirmButtonText: 'אישור',
//           });
//         }}
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleAuthButton;

// import React from "react";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginFailure, loginSuccess } from "../store/authSlice";
// import { useAuthWithGoogleMutation } from "../../../shared/api/userApi";
// import { FcGoogle } from "react-icons/fc";

// const clientId = "412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com";

// const GoogleAuthButton = () => {
//   const MySwal = withReactContent(Swal);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [authWithGoogle] = useAuthWithGoogleMutation();

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const res = await authWithGoogle(tokenResponse.access_token).unwrap();
//         dispatch(loginSuccess({ user: res.user, token: tokenResponse.access_token }));
//         navigate("/");
//       } catch (error: any) {
//         dispatch(loginFailure(error?.data?.message || "שגיאה בהתחברות עם Google"));
//         MySwal.fire({
//           title: "שגיאה",
//           text: "התחברות נכשלה",
//           icon: "error",
//           confirmButtonText: "אישור",
//         });
//       }
//     },
//     onError: () => {
//       MySwal.fire({
//         title: "שגיאה",
//         text: "לא ניתן להתחבר עם חשבון Google",
//         icon: "error",
//         confirmButtonText: "אישור",
//       });
//     },
//     flow: "implicit",
//   });

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <button
//         onClick={() => login()}
//         className="
//           flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300
//           text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300
//           font-semibold select-none
//         "
//         aria-label="התחבר עם Google"
//         type="button"
//       >
//        <FcGoogle className="w-6 h-6" />
//         התחבר עם Google
//       </button>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleAuthButton;
// import React from "react";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginFailure, loginSuccess } from "../store/authSlice";
// import { useAuthWithGoogleMutation } from "../../../shared/api/userApi";
// import { FcGoogle } from "react-icons/fc";
// import { IconWrapper } from "../../../shared/ui/IconWrapper"; // נתיב מותאם למקום בו יש את IconWrapper
// import { cn } from "../../../shared/utils/cn";

// const clientId = "412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com";

// const GoogleAuthButton = () => {
//   const MySwal = withReactContent(Swal);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [authWithGoogle] = useAuthWithGoogleMutation();

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const res = await authWithGoogle(tokenResponse.access_token).unwrap();
//         dispatch(loginSuccess({ user: res.user, token: tokenResponse.access_token }));
//         navigate("/");
//       } catch (error: any) {
//         dispatch(loginFailure(error?.data?.message || "שגיאה בהתחברות עם Google"));
//         MySwal.fire({
//           title: "שגיאה",
//           text: "התחברות נכשלה",
//           icon: "error",
//           confirmButtonText: "אישור",
//         });
//       }
//     },
//     onError: () => {
//       MySwal.fire({
//         title: "שגיאה",
//         text: "לא ניתן להתחבר עם חשבון Google",
//         icon: "error",
//         confirmButtonText: "אישור",
//       });
//     },
//     flow: "implicit",
//   });

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <button
//         onClick={() => login()}
//         type="button"
//         aria-label="התחבר עם Google"
//         className={cn(
//           "inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors",
//           "text-text-main hover:bg-primary hover:text-white",
//           "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 select-none"
//         )}
//       >
//         <IconWrapper size="md" color="accent" className="!rounded-md">
//           <FcGoogle className="w-5 h-5" />
//         </IconWrapper>
//         התחבר עם Google
//       </button>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleAuthButton;
// import React from "react";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginFailure, loginSuccess } from "../store/authSlice";
// import { useAuthWithGoogleMutation } from "../../../shared/api/userApi";
// import { FcGoogle } from "react-icons/fc";

// const clientId = "412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com";

// const GoogleAuthButton = () => {
//   const MySwal = withReactContent(Swal);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [authWithGoogle] = useAuthWithGoogleMutation();

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const res = await authWithGoogle(tokenResponse.access_token).unwrap();
//         dispatch(loginSuccess({ user: res.user, token: tokenResponse.access_token }));
//         navigate("/");
//       } catch (error: any) {
//         dispatch(loginFailure(error?.data?.message || "שגיאה בהתחברות עם Google"));
//         MySwal.fire({
//           title: "שגיאה",
//           text: "התחברות נכשלה",
//           icon: "error",
//           confirmButtonText: "אישור",
//         });
//       }
//     },
//     onError: () => {
//       MySwal.fire({
//         title: "שגיאה",
//         text: "לא ניתן להתחבר עם חשבון Google",
//         icon: "error",
//         confirmButtonText: "אישור",
//       });
//     },
//     flow: "implicit",
//   });

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <button
//         onClick={() => login()}
//         className="
//           flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600
//           text-gray-800 hover:bg-gray-100 transition-colors duration-300
//           font-semibold select-none
//         "
//         aria-label="התחבר עם Google"
//         type="button"
//       >
//         <FcGoogle className="w-6 h-6" />
//         התחבר עם Google
//       </button>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleAuthButton;




import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/userSlice';
import { useAuthWithGoogleMutation } from '../../../shared/api/userApi';
import { loginFailure, loginSuccess } from '../store/authSlice';
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
        console.log('Google user:', user);
        dispatch(loginSuccess({ user: user, token: token }));
        navigate('/home');
      })
      .catch((error: any) => {
        dispatch(loginFailure(error?.data?.message || 'שגיאה בהתחברות עם Google'));
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