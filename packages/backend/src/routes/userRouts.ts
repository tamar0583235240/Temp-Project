import express from 'express';
import multer from 'multer';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getAllUsersByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  createUserByAdmin,
  uploadUsersExcel ,
} from '../controllers/userController';

const router = express.Router();

// הגדרת multer
const upload = multer({ dest: 'uploads/' });

// =====================
// Routes עבור משתמשים רגילים
// =====================

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// =====================
// Routes עבור admin
// =====================

// עדיף לשנות prefix לנתיבי admin, למשל /admin, כדי למנוע כפילויות והתנגשויות
router.get('/admin', getAllUsersByAdmin);
router.post('/admin/add', createUserByAdmin);
router.put('/admin/:id', updateUserByAdmin);
router.delete('/admin/:id', deleteUserByAdmin);
router.post('/admin/upload', upload.single('file'), uploadUsersExcel );

export default router;
