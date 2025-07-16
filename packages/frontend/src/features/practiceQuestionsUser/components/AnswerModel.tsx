import { Dialog } from "@headlessui/react";
import { useState } from "react";
import CodeRunner from './CodeRunner';

interface AnswerModalProps {
  question: {
    id: string;
    content: string;
    type: string;
  };
  onClose: () => void;
  onSubmit: (answer: string) => void;
}

export const AnswerModal = ({ question, onClose, onSubmit }: AnswerModalProps) => {
  const [answer, setAnswer] = useState("");

  const renderInput = () => {
    switch (question.type) {
      case "yes_no":
        return (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setAnswer("כן")}
              className={`px-4 py-2 rounded border ${answer === "כן" ? "bg-green-200" : ""}`}
            >
              כן
            </button>
            <button
              onClick={() => setAnswer("לא")}
              className={`px-4 py-2 rounded border ${answer === "לא" ? "bg-red-200" : ""}`}
            >
              לא
            </button>
          </div>
        );
      case "free_text":
        return (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border mt-4 p-2 rounded"
            rows={4}
            placeholder="כתבי את תשובתך כאן..."
          />
        );
   case "code":
        return (
          <div className="mt-4" style={{ width: '100%', maxWidth: '900px', height: '450px' }}>
<CodeRunner onCodeChange={setAnswer} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="bg-white rounded p-6 z-10 max-w-md w-full text-right">
        <Dialog.Title className="text-lg font-bold text-[--color-text] mb-2">
          ענה על השאלה
        </Dialog.Title>
        <p className="mb-4">{question.content}</p>

        {renderInput()}

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">
            ביטול
          </button>
          <button
            onClick={() => {
              onSubmit(answer);
              onClose();
            }}
            className="bg-[--color-primary] text-white px-4 py-2 rounded"
          >
            שלח תשובה
          </button>
        </div>
      </div>
    </Dialog>
  );
};
