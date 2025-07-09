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

export const updateFeedbackToSystemController = async (req: Request, res: Response): Promise<void> => {
    console.log('updateFeedbackToSystemController called');
    try {
      const updates = req.body;
      console.log(req.body);;
      
      console.log('Received updates:', updates);
      const updatedFeedbackToSystem = await feedbackToSystemRepository.updateFeedbackToSystemById(updates);
      res.json(updatedFeedbackToSystem);
    } catch (error) {
      console.error('Error in updateFeedbackToSystemController:', error);
      res.status(500).json({ error: 'Failed to update FeedbackToSystem' });
    }
  };

  export const deleteFeedbackToSystemController = async (req: Request, res: Response): Promise<void> => {
    console.log('deleteFeedbackToSystemController called');
    try {
      const FeedbackToSystemId = req.params.feedback_id;
      await feedbackToSystemRepository.deleteFeedbackToSystemById(FeedbackToSystemId);
      res.status(200).send("FeedbackToSystem deleted successfully"); 
    } catch (error) {
      console.error('Error in deleteFeedbackToSystemController:', error);
      res.status(500).json({ error });
    }
  };





