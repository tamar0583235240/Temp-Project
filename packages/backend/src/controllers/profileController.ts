import { Request, Response } from "express";
import {
  getAllProfiles,
  getProfileByUserId,
  updateProfile,
} from "../reposioty/profileRepository";
import { updateUsersNameAndContactInfo } from "../reposioty/userRepository";

export const getAllProfilesHandler = async (_req: Request, res: Response) => {
  try {
    const profiles = await getAllProfiles();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profiles." });
  }
};

export const getProfileByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;

  try {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile." });
  }
};

export const updateProfileByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const profile = await getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    await updateUsersNameAndContactInfo(userId, data);
    const updatedProfile = await updateProfile(profile.id, data);

    res.json({
      ...updatedProfile,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};
