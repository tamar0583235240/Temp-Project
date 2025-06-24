import { Request, Response } from 'express';
import { getSharedWithByAnswerAndOwner } from '../reposioty/sharedRecordingRpository';

export const getSharedRecordingParticipants = async (req: Request, res: Response) => {
    const { answerId, ownerId } = req.params;

    try {
        const sharedWith = await getSharedWithByAnswerAndOwner(answerId, ownerId);
        res.status(200).json(sharedWith);
    } catch (error) {
        console.error("Error getting shared participants:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
