import { Router } from "express";
import {
  getAllProfilesHandler,
  getProfileByUserIdHandler,
  updateProfileByUserIdHandler,
} from "../controllers/profileController";

const router = Router();

router.get("/", getAllProfilesHandler);

router.get("/user/:userId", getProfileByUserIdHandler);
router.put("/user/:userId", updateProfileByUserIdHandler);

export default router;