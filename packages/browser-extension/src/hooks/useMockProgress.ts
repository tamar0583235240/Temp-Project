import type { ProgressData } from '../components/ProgressStats';

export const useMockProgress = (): ProgressData | null => {

const data:ProgressData= {total:40,completed:22};
  return data;
};
