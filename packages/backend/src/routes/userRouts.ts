import express from "express";
import {getAllUsers,updateUser,deleteUser,  createUser, } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/add", createUser); // ← נוספה כאן
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;