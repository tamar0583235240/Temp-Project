import { useState } from "react";
import { X, Trash2 } from "lucide-react";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-4 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-lg font-medium">
            <span>👥</span>
            <span>שיתוף הקלטה</span>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex mb-4 gap-2">
          <input
            type="email"
            placeholder="הכנס כתובת אימייל"
            className="flex-1 border rounded-md px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + הוסף
          </button>
        </div>

        <div className="space-y-3 max-h-60 overflow-auto">
          {participants.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-md px-4 py-2"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {getInitial(p.name)}
                </div>
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.email}</div>
                  <div className="text-xs text-gray-400">{p.role}</div>
                </div>
              </div>
              <button onClick={() => handleDelete(i)}>
                <Trash2 className="text-red-500 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
        >
          סגור
        </button>
      </div>
    </div>
  );
};

export default ShareDialog;
