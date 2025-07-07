import { ExperienceThanks } from '@interfaces/entities/ExperienceThanks';
import experienceThanksRepository from '../reposioty/experienceThanksRepository';
import { Request, Response } from 'express';

export const getAllExperienceThanks = async (req: Request, res: Response): Promise<ExperienceThanks[] | void > => {
    try {
        const items = await experienceThanksRepository.getAllExperienceThanks();
        res.json(items);
    } catch (error) {
        console.error('Error in iexperienceThanks controller by getAllExperienceThanks:', error);
        res.status(500).json({ error });
    }
};