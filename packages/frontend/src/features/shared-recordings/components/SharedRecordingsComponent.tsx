// ---------------- src/features/shared-recordings/components/SharedRecordingsComponent.tsx ----------------

import { useState } from "react";
import { useGetSharedRecordingsQuery,useRemoveEmailMutation } from "../../../shared/api/sharedRecordingsApi";
import { SharedRecording } from "../../../shared/api/sharedRecordingsApi";

const SharedRecordingsComponent: React.FC = () => {
  // שליפת הנתונים
  const { data: sharedRecordings = [] } = useGetSharedRecordingsQuery();
  const [removeEmail] = useRemoveEmailMutation();

  // מזהה ההקלטה שבתצוגה
  const [sharedRecordingId, setSharedRecordingId] = useState<string | null>(null);

  // הצגת רשימת מיילים
  const handleShowSharedWith = (id: string) => setSharedRecordingId(id);

  // הסרת מייל
  const handleRemoveAccess = (id: string, email: string) => {
    removeEmail({ id, email });
  };

  return (
    <div>
      <h2>הקלטות משותפות</h2>
      {sharedRecordings.map((rec: SharedRecording) => (
        <div
          key={rec.id}
          style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}
        >
          <div>Recording ID: {rec.id}</div>
          <button onClick={() => handleShowSharedWith(rec.id)}>שיתוף</button>

          {/* מציג מיילים רק להקלטה הנבחרת */}
          {sharedRecordingId === rec.id && (
            <ul>
              {rec.shared_with.map((email: string) => (
                <li key={email}>
                  {email}
                  <button
                    onClick={() => handleRemoveAccess(rec.id, email)}
                    style={{ marginRight: "10px" }}
                  >
                    הסר גישה
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SharedRecordingsComponent;