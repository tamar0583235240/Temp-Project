// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import Modal from 'react-modal';
// import { FaUserPlus } from 'react-icons/fa';
// import './Main.css';

// Modal.setAppElement('#root');

// export const AddNewUser = ({ onUserAdded }) => {
//   const [tz, setTz] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [role, setRole] = useState('');
//   const [createdAt, setCreatedAt] = useState('');
//   const [isActive, setIsActive] = useState(false);
  
//   const [message, setMessage] = useState('');
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post('http://localhost:5000/api/users', {
//   //       tz,
//   //       firstName,
//   //       lastName,
//   //       email,
//   //       phone,
//   //       role,
//   //       createdAt,
//   //       isActive
//   //     });

//   //     setMessage('✅ User added successfully!');
//   //     onUserAdded(response.data);

//   //     // Clear form
//   //     setTz('');
//   //     setFirstName('');
//   //     setLastName('');
//   //     setEmail('');
//   //     setPhone('');
//   //     setRole('');
//   //     setCreatedAt('');
//   //     setIsActive(false);

//   //     closeModal();
//   //   }
//   //    catch (error) {
//   //     setMessage(error.response?.data?.message || '❌ Something went wrong');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/users', {
//         tz,
//         firstName,
//         lastName,
//         email,
//         phone,
//         role,
//         createdAt,
//         isActive
//       });
  
//       onUserAdded(response.data.user); // זה מוסיף אותו למסך
//       //  איפוס השדות
//        setTz('');
//        setFirstName('');
//        setLastName('');
//        setEmail('');
//        setPhone('');
//        setRole('');
//        setCreatedAt('');
//        setIsActive(false);
//        closeModal();//סגירת המודל אחרי שמתאפס
//        setMessage("✅ User added successfully");
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//       setMessage("❌ Something went wrong");
//     }
//   };
  

//   return (
//     <>
//       <motion.button
//         className="add-button"
//         onClick={openModal}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <FaUserPlus /> Add New User
//       </motion.button>

//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         className="Modal"
//         overlayClassName="Overlay"
//       >
//         <h2>Add User</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="tz"
//             value={tz}
//             onChange={(e) => setTz(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="tel"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           />

//           <input
//             type="datetime-local"
//             placeholder="Created At"
//             value={createdAt}
//             onChange={(e) => setCreatedAt(e.target.value)}
//             required
//           />

//           <div className="checkbox-group">
//             <input
//               type="checkbox"
//               checked={isActive}
//               onChange={(e) => setIsActive(e.target.checked)}
//             />
//             <label>Active</label>
//           </div>

//           <div className="modal-buttons">
//             <button type="submit">Add</button>
//             <button onClick={closeModal} type="button" className="cancel">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>

//       <p className="message">{message}</p>
//     </>
//   );
// // };




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import Modal from 'react-modal';
// import { FaUserPlus } from 'react-icons/fa';
// import './Main.css';

// Modal.setAppElement('#root');

// export const AddNewUser = ({ onUserAdded }) => {
//   const [tz, setTz] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [role, setRole] = useState('');
//   const [createdAt, setCreatedAt] = useState('');
//   const [isActive, setIsActive] = useState(false);

//   const [errors, setErrors] = useState({
//     tz: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     role: '',
//     createdAt: '',
//   });

//   const [message, setMessage] = useState(''); // להודעות הצלחה ושגיאה כלליות
//   const [formErrorMessage, setFormErrorMessage] = useState(''); // אם כל הטופס לא מלא אז הוא מציג הודעה אנא תקן את השגיאות לפני השליחה

//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   // טיפול בשינוי ת"ז עם בדיקת ספרות ו-9 תווים מקסימום
//   const handleTzChange = (e) => {
//     let input = e.target.value.replace(/\D/g, '');
//     if (input.length > 9) input = input.slice(0, 9);
//     setTz(input);
//     setErrors(prev => ({
//       ...prev,
//       tz: input.length === 9 ? '' : 'ת"ז חייבת להכיל בדיוק 9 ספרות',
//     }));
//   };

//     // טיפול בשינוי טלפון עם בדיקת ספרות ו-10 תווים מקסימום
//   const handlePhoneChange = (e) => {
//     let input = e.target.value.replace(/\D/g, '');
//     if (input.length > 10) input = input.slice(0, 10);
//     setPhone(input);
//     setErrors(prev => ({
//       ...prev,
//       phone: input.length === 10 ? '' : 'מספר טלפון חייב להכיל בדיוק 10 ספרות',
//     }));
//   };

//   const handleFirstNameChange = (e) => {
//     const input = e.target.value;
//     setFirstName(input);
//     setErrors(prev => ({
//       ...prev,
//       firstName: input.trim() ? '' : 'שדה שם פרטי חובה',
//     }));
//   };

//   const handleLastNameChange = (e) => {
//     const input = e.target.value;
//     setLastName(input);
//     setErrors(prev => ({
//       ...prev,
//       lastName: input.trim() ? '' : 'שדה שם משפחה חובה',
//     }));
//   };

//   const handleEmailChange = (e) => {
//     const input = e.target.value;
//     setEmail(input);
//     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
//     setErrors(prev => ({
//       ...prev,
//       email: emailValid ? '' : 'כתובת אימייל לא חוקית',
//     }));
//   };

//   const handleRoleChange = (e) => {
//     const input = e.target.value;
//     setRole(input);
//     setErrors(prev => ({
//       ...prev,
//       role: input.trim() ? '' : 'שדה תפקיד חובה',
//     }));
//   };

//   const handleCreatedAtChange = (e) => {
//     const input = e.target.value;
//     setCreatedAt(input);
//     setErrors(prev => ({
//       ...prev,
//       createdAt: input ? '' : 'שדה תאריך יצירה חובה',
//     }));
//   };

//   // פונקציה לבדוק אם הטופס תקין
//   const isFormValid = () => {
//     return (
//       tz.length === 9 &&
//       phone.length === 10 &&
//       firstName.trim() !== '' &&
//       lastName.trim() !== '' &&
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
//       role.trim() !== '' &&
//       createdAt !== '' &&
//       Object.values(errors).every(err => err === '')
//     );
//   };

//   // אם הטופס תקין – ננקה את הודעת השגיאה מתחת לכפתור
//   useEffect(() => {
//     if (isFormValid() && formErrorMessage) {
//       setFormErrorMessage('');
//     }
//   }, [tz, phone, firstName, lastName, email, role, createdAt, errors]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       setFormErrorMessage('אנא תקן את השגיאות לפני השליחה');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/users', {
//         tz,
//         firstName,
//         lastName,
//         email,
//         phone,
//         role,
//         createdAt,
//         isActive,
//       });

//       onUserAdded(response.data.user);

//       // איפוס השדות
//       setTz('');
//       setFirstName('');
//       setLastName('');
//       setEmail('');
//       setPhone('');
//       setRole('');
//       setCreatedAt('');
//       setIsActive(false);
//       setErrors({
//         tz: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         role: '',
//         createdAt: '',
//       });

//       setMessage('✅ User added successfully');
//       setTimeout(() => setMessage(''), 3000);
//       closeModal();
//     } catch (error) {
//       setMessage('❌ Something went wrong');
//       setTimeout(() => setMessage(''), 3000);
//       console.error(error.response?.data || error.message);
//     }
//   };

//   return (
//     <>
//       <motion.button
//         className="add-button"
//         onClick={openModal}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <FaUserPlus /> Add New User
//       </motion.button>

//       {/* הודעות הצלחה או שגיאה כלליות מחוץ למודאל */}
//       {message && (
//         <p className="message">{message}</p>
//       )}

//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         className="Modal"
//         overlayClassName="Overlay"
//       >
//         <h2>הוסף משתמש</h2>
//         <form onSubmit={handleSubmit} noValidate>
//           <div>
//             <input
//               type="text"
//               placeholder="תז (9 ספרות)"
//               value={tz}
//               onChange={handleTzChange}
//               required
//             />
//             {errors.tz && <p style={{ color: 'red' }}>{errors.tz}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               placeholder="שם פרטי"
//               value={firstName}
//               onChange={handleFirstNameChange}
//               required
//             />
//             {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               placeholder="שם משפחה"
//               value={lastName}
//               onChange={handleLastNameChange}
//               required
//             />
//             {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
//           </div>

//           <div>
//             <input
//               type="email"
//               placeholder="אימייל"
//               value={email}
//               onChange={handleEmailChange}
//               required
//             />
//             {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               placeholder="טלפון (10 ספרות)"
//               value={phone}
//               onChange={handlePhoneChange}
//               required
//             />
//             {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               placeholder="תפקיד"
//               value={role}
//               onChange={handleRoleChange}
//               required
//             />
//             {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
//           </div>

//           <div>
//             <input
//               type="datetime-local"
//               placeholder="תאריך יצירה"
//               value={createdAt}
//               onChange={handleCreatedAtChange}
//               required
//             />
//             {errors.createdAt && <p style={{ color: 'red' }}>{errors.createdAt}</p>}
//           </div>

//           <div className="checkbox-group">
//             <input
//               type="checkbox"
//               checked={isActive}
//               onChange={(e) => setIsActive(e.target.checked)}
//             />
//             <label>Active</label>
//           </div>

//           <div className="modal-buttons">
//             <button type="submit" disabled={false /* לא חוסם את הכפתור */}>
//               Add
//             </button>
//           </div>

//           {/* הודעת שגיאה לטופס מתחת לכפתור Add */}
//           {formErrorMessage && (
//             <p style={{ color: 'red', marginTop: '8px', textAlign: 'center' }}>
//               {formErrorMessage}
//             </p>
//           )}

//           <div className="modal-buttons">
//             <button onClick={closeModal} type="button" className="cancel">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </>
//   );
// };
