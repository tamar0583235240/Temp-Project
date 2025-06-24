import { useState } from "react";
import { useGetSharedWithQuery } from "../services/ShareApi";
import { Trash2, X } from "lucide-react";
import { ShareDialogProps } from "../types/ShareDialogProps";

const ShareDialog = ({ open, onClose, userId, recordingId }: ShareDialogProps) => {
  const [email, setEmail] = useState("");

  const { data: participants = [], isLoading } = useGetSharedWithQuery({
    userId,
    recordingId,
  }, {
    skip: !open,
  });

  const handleAdd = () => {
    console.log("here we should add the participant");
  };

  const handleDelete = (index: number) => {
    console.log("here we should delete the participant", index);
  };

  const getInitial = (name?: string) => {
    if (!name || name.length === 0) return '?';
    return name.charAt(0).toUpperCase();
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <div className="dialog-title">
            <span>שיתוף הקלטה</span>
          </div>
          <button onClick={onClose} className="close-button">
            <X />
          </button>
        </div>

        <div className="dialog-input-row">
          <input
            type="email"
            placeholder="הכנס כתובת אימייל"
            className="dialog-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleAdd} className="add-button">
            + הוסף
          </button>
        </div>

        {isLoading ? (
          <div>טוען...</div>
        ) : (
          <div className="participants-list">
            {participants.map((p, i) => (
              <div key={i} className="participant-card">
                <div className="participant-info">
                  <div className="participant-initial">{getInitial(p.name)}</div>
                  <div>
                    <div className="participant-name">{p.name}</div>
                    <div className="participant-email">{p.email}</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(i)} className="delete-button">
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareDialog;
