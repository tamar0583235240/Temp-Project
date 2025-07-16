import { getAllfeedbacksInManager, getFeedbackAveragesRepo } from "../reposioty/feedbacksInManagerRepository";
import { Request, Response } from 'express';


export const getFeedbackAverages = async (req: Request, res: Response) => {
    try {
      const averages = await getFeedbackAveragesRepo();
      res.json(averages);
    } catch (error) {
      console.error("Error fetching feedback averages", error);
      res.status(500).json({ message: "Failed to get feedback averages" });
    }
  };


  export const getAllfeedbacksInManagerController = async (req: Request, res: Response): Promise<void> => {

    console.log('getAllfeedbacksInManagerController called');
      try {
      const items = await getAllfeedbacksInManager();
      res.json(items);
    } catch (error) {
      console.error('Error in getAllfeedbacksInManagerController:', error);
      res.status(500).json({ error });
    }
  };