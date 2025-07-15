import { Request, Response } from "express";
import {
  findProfileByUserId,
  getAllProfiles,
  updateProfileById,
} from "../reposioty/profileRepository";
import { uploadFileToCloudinary } from "../config/cloudinary";
import userRepository from "../reposioty/userRepository";

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

    const profileData = {
      ...req.body,
      external_links: req.body.parsedLinks,
      is_public: req.body.isPublic,
      image_url: req.body.imageUrl,
    };

    const updatedProfile = await updateProfileById(profile.id, profileData);

    const user = await userRepository.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    await userRepository.updateUser(userId, {
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      email: profileData.email,
      phone: profileData.phone,
      role: user.role,
    });

    return res.json({
      ...updatedProfile,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      email: profileData.email,
      image_url: profileData.image_url,
      isPublic: profile.is_public,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile." });
  }
};
