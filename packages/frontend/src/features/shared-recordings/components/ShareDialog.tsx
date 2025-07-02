import { useState } from "react";
import { Trash2, X } from "lucide-react";
import {
  useGetSharedWithQuery,
  useAddParticipantMutation,
  useGetPreviouslySharedEmailsQuery,
  useDeleteParticipantMutation,
} from "../services/ShareApi";
import { ShareDialogProps } from "../types/ShareDialogProps";

const ShareDialog = ({ open, onClose, userId, recordingId }: ShareDialogProps) => {
  const [email, setEmail] = useState("");

  const { data: participants = [], isLoading, refetch } = useGetSharedWithQuery(
    { userId, recordingId },
    { refetchOnMountOrArgChange: true, skip: !open }
  );

  console.log("participants:", participants);

  const { data: suggestions = [] } = useGetPreviouslySharedEmailsQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !open,
  });

  const [addParticipant, { isLoading: isAdding }] = useAddParticipantMutation();
  const [deleteParticipant] = useDeleteParticipantMutation();

  const handleAdd = async () => {
    if (!email) return;
    try {
      console.log("Adding participant:", { recordingId, email, userId });
      await addParticipant({ recordingId, email, userId }).unwrap();
      setEmail("");
      refetch();
    } catch (err) {
      console.error("Error adding participant:", err);
      alert("שגיאה בהוספת משתתף. נסה שוב.");
    }
  };

  const handleDelete = async (email: string) => {
    try {
      await deleteParticipant({ recordingId, email }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error deleting participant:", err);
      alert("שגיאה במחיקת משתתף. נסה שוב.");
    }
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
                <button onClick={() => handleDelete(p.email)} className="delete-button">
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