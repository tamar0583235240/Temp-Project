import { useSelector } from "react-redux";
import { RootState } from '../../../shared/store/store';
import AnalysisStep from "../components/AnalysisStep";

const AnalysisStepWrapper = () => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;
  return <AnalysisStep answerId={currentQuestion.id.toString()} />;
};

export default AnalysisStepWrapper;
