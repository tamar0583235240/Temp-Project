import { Router } from "express";
import {
  getAllEducationEntries,
  createEducationEntry,
  updateEducationEntry,
  deleteEducationEntry,
} from "../controllers/educationEntryController";

const router = Router();

router.get("/", getAllEducationEntries);
router.post("/", createEducationEntry);
router.put("/:id", updateEducationEntry);
router.delete("/:id", deleteEducationEntry);

export default router;

