import { useGetProgressStatsQuery } from "../../../shared/api/progressStatsApi";

export const useProgressStats = (userId?: string) => {
  return useGetProgressStatsQuery(userId ?? "", {
    skip: !userId,
  });
};
