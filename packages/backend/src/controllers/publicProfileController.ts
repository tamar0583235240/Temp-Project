import { Request, Response } from "express";
import { getPublicProfileBySlug } from "../reposioty/publicProfileRepository";
export const getPublicProfileBySlugHandler = async (
  req: Request, 
  res: Response
) => {
  const slug = req.params.slug;

  try {
    const profile = await getPublicProfileBySlug(slug);

    if (!profile) {
      return res.status(404).json({ message: "Public profile not found." });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public profile." });
  }
}
