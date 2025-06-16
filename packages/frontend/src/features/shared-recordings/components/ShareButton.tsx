import { Share2 } from 'lucide-react';
import { useState } from 'react';
import ShareDialog from './ShareDialog';

const ShareButton=() =>{
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleShare = () => {
    console.log('שיתוף בוצע!');
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all text-lg"
        dir="rtl"
      >
        <span>שיתוף</span>
        <Share2 className="w-5 h-5" />
      </button>

      <ShareDialog open={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}

export default ShareButton
