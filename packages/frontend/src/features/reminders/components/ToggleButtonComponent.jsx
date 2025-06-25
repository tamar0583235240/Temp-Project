import { useState } from 'react';

export default function ToggleButtonComponent() {
  // מצב הכפתור - דלוק או כבוי
  const [isEnabled, setIsEnabled] = useState(false);

  // פונקציה להחלפת מצב הכפתור
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        
        {/* אזור הכפתור המתג */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            
            {/* טקסט ותיאור */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
              תרגול שאלות מקצועיות יכול לשפר את הבנתך ולחזק את הידע שלך.
              </h3>
              <p className="text-sm text-gray-600">
               קבל שאלות מקצועיות מותאמות אישית  ..    
              </p>
            </div>
            
            {/* הכפתור המתג */}
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
                {/* הנקודה הנעה בתוך המתג */}
                <span
                  className={`inline-block w-4 h-4 transform transition-transform duration-200 ease-in-out bg-white rounded-full shadow-lg ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* התוכן שמופיע כשהמתג דלוק */}
        {isEnabled && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-2">🗓️</div>
                <p className="text-lg font-semibold">כל יום</p>
                <p className="text-sm opacity-90">התוכן מופיע כשהמתג דלוק</p>
              </div>
            </div>
          </div>
        )}

        {/* הודעה כשהמתג מכובה */}
        {!isEnabled && (
          <div className="text-center text-gray-500 mt-6">
            <p>הדלק את המתג כדי לראות את התוכן</p>
          </div>
        )}
        
      </div>
    </div>
  );
}