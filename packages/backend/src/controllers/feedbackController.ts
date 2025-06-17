import { Request, Response } from 'express';
import feedbackRepository from '../reposioty/feedbackReposioty';
import { Feedback } from '../interfaces/Feedback';
export const getFeedbackesBysharedRecordingId = async (req: Request, res: Response): Promise<Feedback | void> => {
    try {
        const sharedRecordingId = req.params.sharedRecordingId;
        const feedbackes = await feedbackRepository.getFeedbackesBysharedRecordingId(sharedRecordingId);
        res.json(feedbackes);
        
        //res.json([{id:"1",sharedRecordingId:"1",givenByUserId:"1",comment:"good",rating:5,createdAt:new Date()},{id:"2",sharedRecordingId:"1",givenByUserId:"1",comment:"good",rating:5,createdAt:new Date()},{id:"3",sharedRecordingId:"1",givenByUserId:"1",comment:"good",rating:5,createdAt:new Date()}])
    } catch (error) {
        console.error('Error in getFeedbackesBysharedRecordingId:', error);
        res.status(500).json({ error });
    }
};
