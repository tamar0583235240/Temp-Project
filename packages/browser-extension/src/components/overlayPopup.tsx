import { useState } from 'react';

import { ProgressButton } from './ProgressButton';
import { ProgressStats } from './ProgressStats';
import { useMockProgress } from '../hooks/useMockProgress';

export const OverlayPopup = () => {
  const [open, setOpen] = useState(false);
  const pd = useMockProgress(); // או מידע אמיתי

  return (
    <>
      <ProgressButton onClick={() => setOpen(!open)} />

      {open && (
        <div className="fixed bottom-20 right-6 z-50">
          <ProgressStats pd={pd} />
        </div>
      )}
    </>
  );
};
