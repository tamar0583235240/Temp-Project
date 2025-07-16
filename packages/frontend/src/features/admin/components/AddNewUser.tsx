import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
<<<<<<< HEAD
import { useCreateUserMutation } from '../services/adminApi';
=======
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SwalForm from './SwalForm';
import { store } from '../store/store.admin';
import { Plus } from 'lucide-react';
>>>>>>> Activity-Monitoring

const MySwal = withReactContent(Swal);

const AddUserWithSwal: React.FC = () => {
<<<<<<< HEAD
  const [createUser] = useCreateUserMutation();

  const handleAddUserClick = () => {
    MySwal.fire({
      title: 'הוספת משתמש חדש',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="שם פרטי" />
        <input id="swal-input2" class="swal2-input" placeholder="שם משפחה" />
        <input id="swal-input3" class="swal2-input" placeholder="אימייל" type="email" />
        <input id="swal-input4" class="swal2-input" placeholder="טלפון" />
        <select id="swal-input5" class="swal2-input">
          <option value="">בחר תפקיד</option>
          <option value="student">תלמיד</option>
          <option value="manager">מנהל</option>
        </select>
      `,
      focusConfirm: false,
      confirmButtonText: 'שמור',
      preConfirm: () => {
        const firstName = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastName = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const role = (document.getElementById('swal-input5') as HTMLSelectElement).value;

        if (!firstName || !lastName || !email || !phone || !role) {
          Swal.showValidationMessage('יש למלא את כל השדות');
          return;
        }

        return { firstName, lastName, email, phone, role };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        createUser(result.value)
          .unwrap()
          .then(() => {
            Swal.fire('נוסף!', 'המשתמש נוסף בהצלחה', 'success');
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('שגיאה', 'הייתה שגיאה בהוספת המשתמש', 'error');
          });
      }
    });
  };

return (
  <button
    onClick={handleAddUserClick}
    style={{
      backgroundColor: '#4CAF50', // ירוק
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
    }}
  >
      הוסף משתמש
=======
  const handleAddUserClick = () => {
    MySwal.fire({
      title: 'הוספת משתמש חדש',
      html: '<div id="swal-form"></div>',
      width: 400,
      didOpen: () => {
        const container = document.getElementById('swal-form');
        if (container) {
          const root = createRoot(container);
          root.render(
            <Provider store={store}>
              <SwalForm />
            </Provider>
          );
        }
      },
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <button
      onClick={handleAddUserClick}
      className="bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition hover:bg-primary-dark/90 flex items-center gap-2 group"
    >
      <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
      הוספת משתמש
>>>>>>> Activity-Monitoring
    </button>
  );
};

export default AddUserWithSwal;
