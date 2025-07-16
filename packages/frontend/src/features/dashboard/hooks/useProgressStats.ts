import { useQuery } from '@tanstack/react-query';
import { getProgressStats } from '../services/dashboardService';
// <<<<<<< HEAD
import { ProgressStats } from '../types/aiInsightsType';
// =======
// import { ProgressStats } from '../types/progress';
// >>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)

export const useProgressStats = (userId?: string) => {
  return useQuery<ProgressStats>({
    queryKey: ['progressStats', userId],
    queryFn: () => getProgressStats(userId!),
// <<<<<<< HEAD
    // enabled: !userId, // מריץ רק אם יש userId
// =======
    enabled: !!userId, // הקריאה תתבצע רק אם יש userId
// >>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
  });
};
