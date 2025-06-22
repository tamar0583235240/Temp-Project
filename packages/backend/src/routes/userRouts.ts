import express from "express";
import multer from "multer";
import { getAllUsers, updateUser, deleteUser, createUser, uploadUsersExcel } from "../controllers/userController";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // הגדרת multer כאן

router.get("/", getAllUsers);
router.post("/add", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// כאן משתמשים ב-upload.single, לא ב-uploadUsersExcel
router.post("/upload", upload.single("file"), uploadUsersExcel);

export default router;
