import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import "./SharedRrcording.css";

type ShareDialogProps = {
  open: boolean;
  onClose: () => void;
};

type Participant = {
  name: string;
  email: string;
  role: string;
};

const dummyParticipants: Participant[] = [
  { name: "יוסי כהן", email: "yossi@example.com", role: "סטודנט" },
  { name: "רחל לוי", email: "rachel@example.com", role: "מנהל" },
  { name: "דוד שמואל", email: "david@example.com", role: "סטודנט" },
];

const ShareDialog = ({ open, onClose }: ShareDialogProps) => {
  const [participants, setParticipants] = useState<Participant[]>(dummyParticipants);
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleAdd = () => {
    if (!email) return;
    setParticipants([
      ...participants,
      { name: email.split("@")[0], email, role: "סטודנט" },
    ]);
    setEmail("");
  };

  const handleDelete = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const getInitial = (name: string) => name.charAt(0);

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <div className="dialog-title">
            <span role="img" aria-label="share">👥</span>
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

        <div className="participants-list">
          {participants.map((p, i) => (
            <div key={i} className="participant-card">
              <div className="participant-info">
                <div className="participant-initial">
                  {getInitial(p.name)}
                </div>
                <div>
                  <div className="participant-name">{p.name}</div>
                  <div className="participant-email">{p.email}</div>
                  <div className="participant-role">{p.role}</div>
                </div>
              </div>
              <button onClick={() => handleDelete(i)} className="delete-button">
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="close-dialog-button">
          סגור
        </button>
      </div>
    </div>
  );
};

export default ShareDialog;
