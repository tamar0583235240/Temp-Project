import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SwalForm from './SwalForm';
import { store } from '../store/store.admin';

const MySwal = withReactContent(Swal);

const AddUserWithSwal: React.FC = () => {
  const handleAddUserClick = () => {
    MySwal.fire({
      title: 'הוספת משתמש חדש',
      html: '<div id="swal-form"></div>',
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
      className="bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition hover:bg-primary-dark/90"
    >
      הוספת משתמש
    </button>
  );
};

export default AddUserWithSwal;
