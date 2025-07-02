  import { useEffect, useState } from "react";
  import { fetchFeedback } from "../services/feedbackService";
  import { DemoAnalysis } from "../components/FeedbackDisplay"; // או להגדיר את הטיפוס בנפרד

  export const useFeedbackAnalysis = (answerId: string) => {
    const [analysis, setAnalysis] = useState<DemoAnalysis | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const load = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await fetchFeedback(answerId);
          setAnalysis(result);
        } catch (err) {
          setError("שגיאה בקבלת ניתוח");
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [answerId]);

    return { analysis, loading, error };
  };
