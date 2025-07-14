import { Request, Response } from "express";
import {
  getAllProfiles,
  getProfileByUserId,
  updateProfile,
} from "../repository/profileRepository";
import { uploadFileToCloudinary } from "../config/cloudinary";

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

export const updateProfileByUserIdHandler = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const profile = await getProfileByUserId(userId);
    if (!profile) return res.status(404).json({ message: "Profile not found." });

    const parsedLinks =
      typeof req.body.external_links === "string"
        ? JSON.parse(req.body.external_links)
        : req.body.external_links ?? [];

    const isPublic =
      typeof req.body.is_public === "string"
        ? req.body.is_public === "true"
        : !!req.body.is_public;

    let imageUrl = profile.image_url;
    if (req.file) {
      const result = await uploadFileToCloudinary(req.file, "profiles");
      imageUrl = result.secure_url;
    }

    const profileData = {
      ...req.body,
      external_links: parsedLinks,
      is_public: isPublic,
      image_url: imageUrl,
    };

    const updatedProfile = await updateProfile(profile.id, profileData);

    return res.json({
      ...updatedProfile,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      email: profileData.email,
      image_url: imageUrl,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};