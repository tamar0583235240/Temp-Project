import { Request, Response } from 'express';
import statusRepository, {
  expandStatusLength,
  getAllStatuses,
  getStatusByUserId as getStatusFromRepo,
  insertStatus,
  updateAnsweredStatus
} from '../reposioty/statusRepository';

// GET /api/status/:userId
export const getStatusByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const answered = await getStatusFromRepo(userId);
    if (answered) {
      console.log('✅ Questions fetched successfully:', answered.length);
      res.json(answered);
    } else {
      console.log('❌ No answered data found');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch answered' });
  }
};

// POST /api/status
export const createStatus = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const newStatus = await statusRepository.insertStatus(user_id); // בלי questionCount
    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Error creating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/status/mark
export const updateStatus = async (req: Request, res: Response) => {
  const { user_id, questionIndex } = req.body;
  try {
    const updatedStatus = await updateAnsweredStatus(user_id, questionIndex);
    res.json(updatedStatus);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/status/expand
export const expandStatus = async (req: Request, res: Response) => {
  const { user_id, questionCount } = req.body;
  try {
    const updated = await expandStatusLength(user_id, questionCount);
    res.json(updated);
  } catch (error) {
    console.error("Error expanding status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const setQuestionAnswered = async (req: Request, res: Response) => {
  const { user_id, questionIndex } = req.body;

  try {
    const updated = await statusRepository.setQuestionAnswered(user_id, questionIndex);
    res.json(updated);
  } catch (error) {
    console.error("Error setting question answered:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


