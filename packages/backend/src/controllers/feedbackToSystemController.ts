import { Request, Response } from 'express';
import feedbackToSystemRepository from '../reposioty/feedbackToSystemRepository';
import { FeedbackToSystem } from '../interfaces/entities/FeedbackToSystem';

export const getFeedbackesToSystemByUserId = async (req: Request, res: Response): Promise<FeedbackToSystem | void> => {
    try {
        const feedbackes = await feedbackToSystemRepository.getAllFeedbackToSystemByUserId(req.params.user_id);
        res.json(feedbackes);
    } catch (error) {
        console.error('Error in getFeedbackesBysharedRecordingId:', error);
        res.status(500).json({ error });
    }
};


