<<<<<<< HEAD
import express from 'express';
import {  createUserByAdmin, deleteUserByAdmin, getAllUsers, getUserById, updateUserByAdmin } from '../controllers/userController';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUserByAdmin);
router.put('/:id', updateUserByAdmin);
router.delete('/:id', deleteUserByAdmin);

// export const userRouts = router;
=======
import express from "express";
import multer from "multer";
import { getAllUsers, updateUser, deleteUser, createUser, uploadUsersExcel } from "../controllers/userController";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  

router.get("/", getAllUsers);
router.post("/add", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/upload", upload.single("file"), uploadUsersExcel);

>>>>>>> Activity-Monitoring
export default router;
