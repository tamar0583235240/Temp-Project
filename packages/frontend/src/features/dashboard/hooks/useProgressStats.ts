import { useQuery } from '@tanstack/react-query';
import { ProgressStats } from '../types/progress';
import { getProgressStats } from '../services/dashboardService';

export const useProgressStats = (userId?: string) => {
  return useQuery<ProgressStats>({
    queryKey: ['progressStats', userId],
    queryFn: () => getProgressStats(userId!),
    enabled: !!userId, // הקריאה תתבצע רק אם יש userId
  });
};