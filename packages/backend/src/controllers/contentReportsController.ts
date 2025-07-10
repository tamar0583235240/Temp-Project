import contentReportsRepository from '../reposioty/contentReportsRepository';
import { Request, Response } from 'express';
import { ContentReports } from '../interfaces/entities/ContentReports';

export const addContentReports = async (req: Request, res: Response): Promise<ContentReports | void> => {
    try {
        const contentReport:ContentReports = req.body;
        console.log('Received ontentReports:', contentReport);
        
        const item = await contentReportsRepository.addContentReports(contentReport);
        res.json(item);
    } catch (error) {
        console.error('Error in ContentReports controller by addContentReports:', error);
        res.status(500).json({ error });
    }
};  