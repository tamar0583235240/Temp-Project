import e, { Request, Response } from 'express';
import practiceQuestionsRepository from '../reposioty/PracticeQuestionsRepository';


 export const getallPracticeQuestions = async (req: Request, res: Response) => {
  try {
    const practiceQuestions = await practiceQuestionsRepository.getallPracticeQuestions();
    res.json(practiceQuestions);
  } catch (error) {
    console.error('Error fetching practice questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPracticeQuestionsByTopicController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const practiceQuestions = await practiceQuestionsRepository.getPracticeQuestionsByTopic(topicId);
    res.json(practiceQuestions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createPracticeQuestionController = async (req: Request, res: Response) => {
  const {
    content,
    difficulty,
    type,
    generated_by_ai = false,
    created_by,
    topic,
    hints = [],
  } = req.body;

  try {
    //יצירת שאלה חדשה
    const question = await practiceQuestionsRepository.createPracticeQuestion({
      content,
      difficulty,
      type,
      generated_by_ai,
      created_by,
    });

    //מציאת או יצירת נושא
    const topicRecord = await practiceQuestionsRepository.findOrCreateTopicByName(topic);

    //קישור השאלה לנושא
    await practiceQuestionsRepository.createQuestionTopicLink(question.id, topicRecord.id);

    //הוספת רמזים
    for (const hint of hints) {
      await practiceQuestionsRepository.createHint({
        question_id: question.id,
        content: hint,
        generated_by_ai: false, // או true אם מגיע מ-AI
      });
    }

    res.status(201).json({
      message: 'השאלה נוספה בהצלחה',
      questionId: question.id,
    });
  } catch (error: any) {
    console.error('שגיאה בהוספת שאלה:', error);
    res.status(500).json({
      message: 'שגיאה בעת יצירת שאלה חדשה',
      error: error.message,
    });
  }
};

export const getAllTopicsController = async (req: Request, res: Response) => {
  try {
    const topics = await practiceQuestionsRepository.getAllTopics();
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error getting topics:", error);
    res.status(500).json({ message: 'שגיאה בטעינת נושאים' });
  }
};

