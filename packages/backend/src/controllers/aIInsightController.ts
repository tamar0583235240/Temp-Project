import { Request, Response } from 'express';
import allnsigthRepository from '../reposioty/allnsigthRepository';

export const getAllnsigth = async (req: Request, res: Response): Promise<void> => {
//   console.log('exampleController called');
  try {
    const items = await allnsigthRepository.getAllallnsight();
    res.json(items);
  } catch (error) {
    console.error('Error in exampleController:', error);
    res.status(500).json({ error });
  }
};