
import { FeedbackResponse } from "../types/feedback";


export const fetchFeedback = async (answerId: string): Promise<string> => {
  const response = await fetch(`http://localhost:5000/api/answers/${answerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ audioId }),
  });

  if (!response.ok) {
    throw new Error("שגיאה בשרת");
  }

  const data: FeedbackResponse = await response.json();
  console.log("🔍 API response:", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  return `⭐ ביטחון: 4/5\n⭐ זרימה: 5/5\n⭐ הססנות: 2/5\n\nנשמע יחסית בטוח, הדיבור זורם, אך יש הססנות קלה.`;
//   return data.feedback;
};

// // גרסת דמו (לא חובה):
// export const fetchMockFeedback = async (): Promise<string> => {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return `⭐ ביטחון: 4/5\n⭐ זרימה: 5/5\n⭐ הססנות: 2/5\n\nנשמע יחסית בטוח, הדיבור זורם, אך יש הססנות קלה.`;
// };
