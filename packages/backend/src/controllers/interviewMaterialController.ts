import { Request, Response } from 'express';
import interveiwMaterialRepository from '../reposioty/interveiwMaterialRepository';

export const getAllInterviewMaterials = async (req: Request, res: Response) => {
  try {
    const im = await interveiwMaterialRepository.selectAllInteveiwMaterials();
    res.status(200).json(im);
  } catch (error) {
    console.error('Failed to fetch interveiw materials:', error);
    res.status(500).json({ message: 'אירעה שגיאה בעת שליפת המשאבים' });
  }
}