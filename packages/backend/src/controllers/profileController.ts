import { Request, Response } from "express";
import {
  getAllProfiles,
  getProfileByUserId,
  updateProfile,
} from "../reposioty/profileRepository";
import { updateUsersNameAndContactInfo } from "../reposioty/userRepository";
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
  const data = req.body;

  try {
    // Fetch the existing profile
    const profile = await getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Handle the image upload if there's a file
    let imageUrl = profile.image_url;
    if (req.file) {
      const folder = 'profiles';
      const result = await uploadFileToCloudinary(req.file, folder);
      imageUrl = result.secure_url;
    }

    const profileData = {
      ...data,
      image_url: imageUrl,
    };

    // Update the profile in the database
    const updatedProfile = await updateProfile(profile.id, profileData);

    res.json({
      ...updatedProfile,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      email: profileData.email,
      image_url: imageUrl,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};