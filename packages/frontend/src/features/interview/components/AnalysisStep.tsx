import { useEffect, useState } from "react";
import TipsComponent from "./tipsComponent";
import AnswerAI from "./AnswerAI";

interface AnalysisStepProps {
  answerId: string;
}

function TailwindLoader() {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <span className="inline-block w-12 h-12 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></span>
    </div>
  );
}

export default function AnalysisStep({ answerId }: AnalysisStepProps) {
  const [step, setStep] = useState<'loading' | 'showTipsAndAnswer'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('showTipsAndAnswer');
    }, 4000); // זמן טעינה (2.2 שניות)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center w-full">
      {/* Loader תחת השאלה */}
      {step === 'loading' && <TailwindLoader />}
      {/* אחרי טעינה - מציגים טיפ ו-AI */}
      {step === 'showTipsAndAnswer' && (
        <>
          <TipsComponent />
          <AnswerAI answerId={answerId} />
        </>
      )}
    </div>
  );
}
