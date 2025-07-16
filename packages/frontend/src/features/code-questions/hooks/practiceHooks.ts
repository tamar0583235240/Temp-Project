import { useSubmitAnswerMutation } from '../../../shared/api/practiceApi';

export const useCheckAnswer = () => {
  const [submitAnswer, { data, isLoading, isError }] = useSubmitAnswerMutation();

  const checkAnswer = async (questionId: string, answer: string) => {
    try {
      const res = await submitAnswer({ questionId, answer }).unwrap();
      return res.correct;
    } catch (err) {
      console.error('Error checking answer', err);
      return false;
    }
  };

  return { checkAnswer, data, isLoading, isError };
};
