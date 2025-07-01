import { useState } from 'react';

import { ProgressButton } from './ProgressButton';
import { ProgressStats } from './ProgressStats';

export const OverlayPopup = () => {
  const [open, setOpen] = useState(false);
const pd={total: 40, completed: 22}; // Mock data, replace with actual progress data
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
