import { Request, Response } from 'express';
import * as sharedRepo from '../reposioty/sharedRecordings.repository';

export const getSharedRecordingsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string; // ✅ שינוי כאן
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in query' });
    }
    const recordings = await sharedRepo.getSharedRecordingsByUserId(userId);
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRecordingDetails = async (req: Request, res: Response) => {
  try {
    const recordingId = req.params.recordingId;
    const details = await sharedRepo.getRecordingDetailsById(recordingId);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createFeedback = async (req: Request, res: Response) => {
  try {
    console.log('BODY RECEIVED:', req.body);
    const { sharedRecordingId, givenByUserId, comment, rating } = req.body;

    if (!sharedRecordingId || !givenByUserId || !comment || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid fields in request body.' });
    }

    const feedback = await sharedRepo.insertFeedback(
      sharedRecordingId,
      givenByUserId,
      comment,
      rating
    );

    res.status(201).json(feedback);
  } catch (error: any) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      message: 'Internal server error while creating feedback',
      details: error.message,
    });
  }
};


export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackId = req.params.id;
    const { comment, rating } = req.body;
    const updated = await sharedRepo.updateFeedback(feedbackId, comment, rating);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};
