import { Request, Response } from 'express';
import shareRecordingRepository from '../reposioty/shareRecordingRepository';


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

export const deleteEmailFromSharedRecording = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. חילוץ הפרמטרים מה-URL
        // const { sharedRecordingId, email } = req.params;
        const sharedRecordingId = '00000000-0000-0000-0000-000000000040';
        const email = 'eitan.cohen@example.com';
        
        await shareRecordingRepository.deleteEmailFromSharedRecording(sharedRecordingId,email);

    } catch (error) {
        console.error('Error in getSharedRecordingIdByAnswerId:', error);
        res.status(500).json({ error });
    }
};