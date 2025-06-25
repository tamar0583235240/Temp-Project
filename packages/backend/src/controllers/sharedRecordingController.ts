import { Request, Response } from 'express';
import { getAllPreviouslySharedEmails, getSharedWithByAnswerAndOwner } from '../reposioty/sharedRecordingRpository';

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

export const getPreviouslySharedEmails = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const emails = await getAllPreviouslySharedEmails(userId);
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error getting shared emails:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};