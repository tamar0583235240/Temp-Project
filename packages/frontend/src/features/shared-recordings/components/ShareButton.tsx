import { useState } from 'react';
import { Share2 } from 'lucide-react';
import ShareDialog from './ShareDialog';
import './SharedRrcording.css';

type ShareButtonProps = {
  setIsDialogOpen: (open: boolean) => void;
};

const ShareButton = ({setIsDialogOpen}: ShareButtonProps) => {

  return (
    <div className="share-button-wrapper">
      <button onClick={()=>{setIsDialogOpen(true)}} className="download-button">
        <Share2 className="download-icon" />
        שיתוף
      </button>
    </div>
  );
};

export default ShareButton;
