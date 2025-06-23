import { Request, Response } from 'express';
import shareRecordingRepository  from '../reposioty/shareRecordingRepository';

export const getSharedRecordingIdByAnswerId = async (req: Request, res: Response): Promise<string | void> => {
    try {
        const answerId = req.params.answerId;
        const sharedRecordingId = await shareRecordingRepository.getSharedRecordingIdByAnswerId(answerId);
        res.json(sharedRecordingId);
        
    } catch (error) {
        console.error('Error in getSharedRecordingIdByAnswerId:', error);
        res.status(500).json({ error });
    }
};