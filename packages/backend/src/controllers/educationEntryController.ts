import { Request, Response } from "express";
import * as repo from "../reposioty/educationEntryRepository";
import { v4 as uuidv4 } from "uuid";

export const getAllEducationEntries = async (req: Request, res: Response) => {
  const userId = req.query.user_id as string;
  if (!userId) return res.status(400).json({ message: "user_id is required" });

  try {
    const results = await repo.getEducationEntriesByUserId(userId);
    if (!results.length) return res.status(404).json({ message: "No education entries found" });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch education entries" });
  }
};

export const createEducationEntry = async (req: Request, res: Response) => {
  const {
    userId,
    institutionName,
    degree,
    courseName,
    fieldOfStudy,
    startDate,
    endDate,
    isPublic,
  } = req.body;

  if (!userId || !institutionName || !startDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newEntry = await repo.createEducationEntry({
      id: uuidv4(),
      institutionName,
      degree,
      courseName,
      fieldOfStudy,
      startDate,
      endDate,
      isPublic: isPublic ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { id: userId } as any,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create education entry" });
  }
};

export const updateEducationEntry = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updated = await repo.updateEducationEntry(id, data);
    if (!updated) return res.status(404).json({ message: "Entry not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update education entry" });
  }
};

export const deleteEducationEntry = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await repo.deleteEducationEntry(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete education entry" });
  }
};
