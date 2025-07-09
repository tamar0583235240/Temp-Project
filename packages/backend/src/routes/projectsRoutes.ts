import { Router } from "express";
import {
    getAllProjects,
    getProjectByIdController,
    addProject,
    updateProjectController,
    deleteProjectController,
} from "../controllers/projectsController";
import multer from "multer";

// אם את משתמשת ב-Multer לקבצים
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// 🟢 שליפת כל הפרויקטים למשתמש מסוים לפי userId בפרמטר
router.get("/:userId", getAllProjects);

router.get("/:userId/project/:id", getProjectByIdController);

// 🟢 יצירת פרויקט חדש עם העלאת תמונה (thumbnail)
router.post(
    "/",
    upload.fields([{ name: "thumbnail", maxCount: 1 }]),
    addProject
);

// 🟢 עדכון פרויקט לפי מזהה
router.put(
    "/:id",
    upload.fields([{ name: "thumbnail", maxCount: 1 }]),
    updateProjectController
);

// 🟢 מחיקת פרויקט לפי מזהה
router.delete("/:id", deleteProjectController);

export default router;
