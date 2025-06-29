import { useEffect, useState } from 'react';
import { SharedRecording } from '../types/types';

export function useSharedRecordings() {
  const [data, setData] = useState<SharedRecording[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  fetch('/api/shared-recordings')
    .then((res) => res.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setData(json);
      } else {
        console.error('צורת תגובת השרת לא תקינה:', json);
        setData([]); // כדי למנוע קריסה בפרונט
      }
    })
    .catch((err) => {
      console.error('שגיאת fetch:', err);
      setData([]);
    })
    .finally(() => setIsLoading(false));
}, []);


  return { data, isLoading };
}
