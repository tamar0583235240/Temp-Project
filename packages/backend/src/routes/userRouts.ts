<<<<<<< HEAD
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';
import express from 'express';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
=======
import express from "express";
import {getAllUsers,updateUser,deleteUser} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
export default router;
