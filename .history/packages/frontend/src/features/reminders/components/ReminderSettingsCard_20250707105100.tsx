// Remi
import React, { useEffect, useState } from "react";
import { CardSimple } from "../../../shared/ui/card";
import { cn } from "../../../shared/utils/cn";

// אייקון מותאם – ניתן להחליף
const ReminderIcon = () => <span className="text-xl">📅</span>;

type OptionType = {
  id: string;
  text: string;
  icon: string;
};

type Props = {
  title: string;
  description: string;
  reminderType: string;
  savedOption?: string | null;
  onOptionChange: (reminderType: string, optionId: string | null) => void;
};

export default function ReminderSettingsCard({
  title,
  description,
  reminderType,
  savedOption = null,
  onOptionChange,
}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(savedOption);

  useEffect(() => {
    setSelectedOption(savedOption ?? null);
    setIsEnabled(savedOption !== null);
  }, [savedOption]);

  const toggleSwitch = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    if (!newEnabled) {
      setSelectedOption(null);
      onOptionChange(reminderType, null);
    } else {
      onOptionChange(reminderType, selectedOption);
    }
  };

  const selectOption = (optionId: string) => {
    setSelectedOption(optionId);
    onOptionChange(reminderType, optionId);
  };

  const options: OptionType[] = [
    { id: "every-two-days", text: "כל יומיים", icon: "📅" },
    { id: "daily", text: "כל יום", icon: "📅" },
    { id: "weekly", text: "אחת לשבוע", icon: "📅" },
    { id: "every-three-days", text: "אחת ל-3 ימים", icon: "📅" },
  ];

  return (
    <CardSimple className="space-y-4">
      <div className="flex items-center gap-2 justify-between ">
        <button
          onClick={toggleSwitch}
          className={cn(
            "relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 p-0.5",
            isEnabled ? "bg-primary-dark" : "bg-gray-300"
          )}
        >
          <span
            className={cn(
              "inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform",
              isEnabled ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
        <div>
          <h3 className="text-lg font-semibold text-text-main mb-1 text-right">{title}</h3>
          <p className="text-sm text-text-secondary leading-snug text-right">{description}</p>
        </div>
      </div>

      {isEnabled ? (
        <>
          <h4 className="text-sm font-medium text-text-main text-center mt-4 text-right">
            בחר את תדירות התזכורת שלך:
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => selectOption(option.id)}
                className={cn(
                  "relative p-4 rounded-lg border cursor-pointer transition-all text-center space-y-1",
                  selectedOption === option.id
                    ? "bg-primary-dark border-primary-dark text-white"
                    : "bg-gray-50 border-border text-text-main hover:border-gray-300"
                )}
              >
                <div className="text-2xl">{option.icon}</div>
                <p className="text-sm font-medium">{option.text}</p>
                {selectedOption === option.id && (
                  <div className="absolute top-2 right-2">
                    <span className="text-white">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedOption && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <p className="text-green-800 text-sm text-right">
                  נבחר: {options.find((opt) => opt.id === selectedOption)?.text}
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-text-secondary mt-4 text-sm text-right">
          הדלק את המתג כדי לבחור תדירות תזכורת
        </p>
      )}
    </CardSimple>
  );
}