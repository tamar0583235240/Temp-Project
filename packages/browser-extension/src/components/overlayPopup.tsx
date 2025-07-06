import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ProgressStats } from './ProgressStats';
import { getProgress } from '../api/api';

export const OverlayPopup = ({ token: token }: { token: string }) => {
  const [open, setOpen] = useState(false);
  const [pd, setPd] = useState(null);
  useEffect(() => {
    const pd = async () => {
      const pd = await getProgress(token);
      setPd(pd);
    }
    pd();
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(!open)} />
      {open && (
        <div className="fixed bottom-20 right-6 z-50">
          <ProgressStats pd={pd} />
        </div>
      )}
    </>
  );
};
