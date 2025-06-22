import { useState } from 'react';
import { Share2 } from 'lucide-react';
import ShareDialog from './ShareDialog';
import './SharedRrcording.css';

const ShareButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleShare = () => {
    console.log('שיתוף בוצע!');
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="share-button-wrapper">
      <button onClick={handleShare} className="download-button" dir="rtl">
        <Share2 className="download-icon" />
        שיתוף
      </button>

      <ShareDialog open={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default ShareButton;
