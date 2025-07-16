import { Request, Response } from 'express';
import { Feedback } from '../interfaces/entities/Feedback';
import { getFeedbackesByanswerIdRepo, getFeedbackAveragesRepo,getAllFeedbacksRepo } from '../reposioty/feedBackRepository';

export const getFeedbackesByanswerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const sharedRecordingId = req.params.sharedRecordingId;
    const feedbackes = await getFeedbackesByanswerIdRepo(sharedRecordingId);
    res.json(feedbackes);
  } catch (error) {
    console.error('Error in getFeedbackesBysharedRecordingId:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getFeedbackAverages = async (req: Request, res: Response) => {
  try {
    const averages = await getFeedbackAveragesRepo();
    res.json(averages);
  } catch (error) {
    console.error("Error fetching feedback averages", error);
    res.status(500).json({ message: "Failed to get feedback averages" });
  }
};
export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const allFeedbacks = await getAllFeedbacksRepo();
    res.status(201).json(allFeedbacks)
  } catch (error) {
    res.status(500).json({ message: "Failed to get all feedbacks " });

  }
}
