import { Router } from "express";
import {
  getSkills,
  createSkill,
  updateSkillVisibility
} from "../controllers/expertiseSkills";

const router = Router();

// שליפת כל הכישורים של משתמש
router.get("/:userId", getSkills);

// יצירת כישור חדש למשתמש
router.post("/:userId", createSkill);

// עדכון חשיפה של כישור מסוים
router.put("/:userId/:id/visibility", updateSkillVisibility);

export default router;
