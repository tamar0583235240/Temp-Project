
import { DemoAnalysis } from "../components/FeedbackDisplay";
import { FeedbackResponse } from "../types/feedback";

// דוגמת המרה פשוטה של הטקסט לאובייקט DemoAnalysis
export const fetchFeedback = async (answerId: string): Promise<DemoAnalysis> => {
  // כאן תבצע את הקריאה ל-API ותקבל נתונים בפורמט מתאים

  // עכשיו החזרת אובייקט DemoAnalysis מדומה
  await new Promise(resolve => setTimeout(resolve, 1000)); // דמה של השהייה

  return {
    score: 4,
    summary: "נשמע יחסית בטוח, הדיבור זורם, אך יש הססנות קלה.",
    positives: ["בטוח בעצמו", "זורם בדיבור"],
    improvements: ["הססנות קלה"],
    aiComment: "מעולה, המשך כך"
  };
};


// // גרסת דמו (לא חובה):
// export const fetchMockFeedback = async (): Promise<string> => {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return `⭐ ביטחון: 4/5\n⭐ זרימה: 5/5\n⭐ הססנות: 2/5\n\nנשמע יחסית בטוח, הדיבור זורם, אך יש הססנות קלה.`;
// };
