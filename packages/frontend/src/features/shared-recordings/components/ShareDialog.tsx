import { useState } from "react";
import { Trash2, X } from "lucide-react";
import {
  useGetSharedWithQuery,
  useAddParticipantMutation,
  useGetPreviouslySharedEmailsQuery,
} from "../services/ShareApi";
import { ShareDialogProps } from "../types/ShareDialogProps";

const ShareDialog = ({ open, onClose, userId, recordingId }: ShareDialogProps) => {
  const [email, setEmail] = useState("");

  const { data: participants = [], isLoading } = useGetSharedWithQuery(
    { userId, recordingId },
    { skip: !open }
  );

  const { data: suggestions = [] } = useGetPreviouslySharedEmailsQuery(userId, {
    skip: !open,
  });

  const [addParticipant, { isLoading: isAdding }] = useAddParticipantMutation();

  const handleAdd = async () => {
    if (!email) return;
    try {
      await addParticipant({ recordingId, email }).unwrap();
      setEmail("");
    } catch (err) {
      console.error("Error adding participant:", err);
      alert("שגיאה בהוספת משתתף. נסה שוב.");
    }
  };

  const handleDelete = (index: number) => {
    console.log("כאן אמור להימחק משתתף לפי אינדקס", index);
  };

  const getInitial = (name?: string) => {
    if (!name || name.length === 0) return "?";
    return name.charAt(0).toUpperCase();
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.email.toLowerCase().includes(email.toLowerCase()) && email.length > 1
  );

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

        <div className="dialog-input-row autocomplete-wrapper">
          <input
            type="email"
            placeholder="הכנס כתובת אימייל"
            className="dialog-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="add-button"
            disabled={isAdding || !email}
          >
            {isAdding ? "מוסיף..." : "+ הוסף"}
          </button>
          {filteredSuggestions.length > 0 && (
            <ul className="autocomplete-list">
              {filteredSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="autocomplete-item"
                  onClick={() => setEmail(s.email)}
                >
                  {s.name ? `${s.name} - ${s.email}` : s.email}
                </li>
              ))}
            </ul>
          )}
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
