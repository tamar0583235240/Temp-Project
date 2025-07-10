import { Request, Response } from "express";
import {
  findProfileByUserId,
  getAllProfiles,
  updateProfileById,
} from "../reposioty/profileRepository";

// GET /profiles
export const getAllProfilesHandler = async (_req: Request, res: Response) => {
  try {
    const profiles = await getAllProfiles();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profiles." });
  }
};

// ✅ GET /profiles/user/:userId
export const getProfileByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;

  try {
    const user = await findProfileByUserId(userId);

    if (!user) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile." });
  }
};

// ✅ PUT /profiles/user/:userId
export const updateProfileByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const profile = await findProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const updated = await updateProfileById(profile.user_id, data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile." });
  }
};
