import { Request, Response } from "express";
import userRepository from '../reposioty/userRepository';
import {getUserExpertiseSkills, addExpertiseSkill, toggleSkillVisibility, 
} from '../reposioty/expertiseSkillsRepository';
export const getSkills = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    if (!userId) return res. status(401).json({ message: "Unauthorized" });
    const skills = await getUserExpertiseSkills(userId);
    res.json(skills);
  } catch (error) {
    console.error("Error getting skills:", error);
    res.status(500).json({ message: "שגיאה בשליפת המיומנויות" });
  }
};
export const createSkill = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    const { category, name, level, isPublic } = req.body;
    if (!userId || !category || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const skill = await addExpertiseSkill(userId, category, name, level, isPublic);
    res.status(201).json(skill);
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ message: "שגיאה ביצירת המיומנות" });
  }
};
export const updateSkillVisibility = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    const { id } = req.params;
    const { isPublic } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const updated = await toggleSkillVisibility(Number(id), userId, isPublic);
    res.json(updated);
  } catch (error) {
    console.error("Error updating skill visibility:", error);
    res.status(500).json({ message: "שגיאה בעדכון המיומנות" });
  }
};






