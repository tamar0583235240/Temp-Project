import { ExperienceThanks } from '../interfaces/entities/ExperienceThanks';
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

export const addExperienceThanks = async (req: Request, res: Response): Promise<ExperienceThanks | void> => {
    try {
        const experienceThanks:ExperienceThanks = req.body;
        console.log('Received experienceThanks:', experienceThanks);
        
        const item = await experienceThanksRepository.addExperienceThanks(experienceThanks);
        res.json(item);
    } catch (error) {
        console.error('Error in iexperienceThanks controller by addExperienceThanks:', error);
        res.status(500).json({ error });
    }
};  