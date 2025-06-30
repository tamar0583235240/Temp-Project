
import { useState } from 'react';

type OptionType = {
  id: string;
  text: string;
  icon: string;
};

export default function TimeQuestionButton() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      setSelectedOption(null);
    }
  };

  const selectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const options: OptionType[] = [
    { id: 'every-two-days', text: 'כל יומיים', icon: '📅' },
    { id: 'daily', text: 'כל יום', icon: '📅' },
    { id: 'weekly', text: 'אחת לשבוע', icon: '📅' },
    { id: 'every-three-days', text: 'אחת ל-3 ימים', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                תרגול שאלות מקצועיות
              </h3>
              <p className="text-sm text-gray-600">
                קבל תזכורות לתרגול שאלות מקצועיות כדי לשפר את הידע שלך.
              </p>
            </div>
            <div className="relative">
              <button
                onClick={toggleSwitch}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isEnabled ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                type="button"
                role="switch"
                aria-checked={isEnabled}
              >
                <span
                  className={`inline-block w-4 h-4 transform transition-transform duration-200 ease-in-out bg-white rounded-full shadow-lg ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {isEnabled && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-md font-semibold text-gray-800 mb-4 text-center">
              בחר את תדירות התזכורת שלך:
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option: OptionType) => (
                <div
                  key={option.id}
                  onClick={() => selectOption(option.id)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                    selectedOption === option.id
                      ? 'bg-gray-800 border-gray-800 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <p className="text-sm font-medium">{option.text}</p>
                  </div>

                  {selectedOption === option.id && (
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isEnabled && (
          <div className="text-center text-gray-500 mt-6">
            <p>הדלק את המתג כדי לבחור תדירות תזכורת</p>
          </div>
        )}

        {isEnabled && selectedOption && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <div className="flex items-center">
              <div className="text-green-600 ml-2">✓</div>
              <p className="text-green-800 text-sm">
                נבחר: {options.find((opt) => opt.id === selectedOption)?.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}