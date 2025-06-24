import { useEffect, useState } from 'react';
import { SharedRecording } from '../types/types';

export function useSharedRecordings() {
  const [data, setData] = useState<SharedRecording[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/shared-recordings')
      .then((res) => res.json())
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}
