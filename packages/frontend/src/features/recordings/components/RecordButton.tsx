import React from "react";
import {
  FiMic,
  FiPause,
  FiPlay,
  FiRefreshCw,
  FiCheckCircle,
  FiTrash2,
  FiDownload,
  FiSave,
  FiX,
  FiSquare,
} from "react-icons/fi";

interface RecordButtonProps {
  open: boolean;
  onClose: () => void;
  recordingPhase: "idle" | "recording" | "paused" | "finished";
  onMainButtonClick: () => void;
  onStopRecording: () => void;
  onRestartRecording: () => void;
  recordingTime: number;
  audioBlob: Blob | null;
  onSave: () => void;
  onDownload: () => void;
  formatTime: (seconds: number) => string;
  className?: string;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  open,
  onClose,
  recordingPhase,
  onMainButtonClick,
  onStopRecording,
  onRestartRecording,
  recordingTime,
  audioBlob,
  onSave,
  onDownload,
  formatTime,
  className = '',
  disabled = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center relative animate-fadeInUp border border-[var(--color-border)] ${className}`}
      >
        {/* כפתור סגירה */}
        <button
          className="absolute left-6 top-6 text-[var(--color-secondary-text)] hover:text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-muted)] rounded-full p-2"
          onClick={onClose}
          aria-label="סגור"
        >
          <FiX size={20} />
        </button>

        {/* כותרת */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">הקלטת קול</h2>
          <p className="text-[var(--color-secondary-text)] text-sm">הקלט את התשובה שלך</p>
        </div>

        {/* מצב Idle */}
        {recordingPhase === "idle" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full bg-gradient-to-br"
                style={{
                  backgroundImage: "linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))",
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <FiMic size={32} className="text-white" />
                </div>
              </div>
            </div>

            <button
              className="w-full text-white rounded-xl px-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3"
              style={{
                backgroundImage: "linear-gradient(to right, var(--color-primary), var(--color-primary-dark))",
              }}
              onClick={onMainButtonClick}
            >
              <FiMic size={20} />
              התחל הקלטה
            </button>
          </div>
        )}

        {/* מצב Recording */}
        {recordingPhase === "recording" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <FiMic size={32} className="text-white" />
                </div>
                <div
                  className="absolute -inset-2 rounded-full border-4 opacity-30 animate-ping"
                  style={{ borderColor: "var(--color-primary)" }}
                ></div>
                <div
                  className="absolute -inset-4 rounded-full border-2 opacity-20 animate-ping"
                  style={{ borderColor: "var(--color-primary)", animationDelay: "0.5s" }}
                ></div>
              </div>
              <div className="font-bold text-xl mb-3" style={{ color: "var(--color-primary-dark)" }}>
                מקליט...
              </div>

              <div
                className="rounded-2xl px-6 py-3 border shadow-inner"
                style={{
                  background: "linear-gradient(to right, var(--color-primary)/0.1, var(--color-primary-dark)/0.1)",
                  borderColor: "var(--color-primary)",
                }}
              >
                <div
                  className="font-mono text-2xl font-bold tracking-wider"
                  style={{ color: "var(--color-primary-dark)" }}
                >
                  {formatTime(recordingTime)}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--color-secondary-text)" }}>
                  זמן הקלטה
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 rounded-xl px-4 py-3 font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
                onClick={onMainButtonClick}
              >
                <FiPause size={18} />
                השהה
              </button>
              <button
                className="flex-1 rounded-xl px-4 py-3 font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-secondary-text)",
                  color: "white",
                  opacity: 0.9,
                }}
                onClick={onStopRecording}
              >
                <FiSquare size={18} />
                עצור
              </button>
            </div>
          </div>
        )}

        {/* מצב Paused */}
        {recordingPhase === "paused" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg opacity-60"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <FiPause size={32} className="text-white" />
              </div>
              <div className="font-bold text-lg mb-3" style={{ color: "var(--color-primary-dark)" }}>
                הקלטה מושהית
              </div>

              <div
                className="rounded-2xl px-6 py-3 border shadow-inner"
                style={{
                  background: "linear-gradient(to right, #FFFBEB, #FEF3C7)", // צהבהב עדין
                  borderColor: "#FDE68A",
                }}
              >
                <div
                  className="font-mono text-2xl font-bold tracking-wider"
                  style={{ color: "#B45309" }}
                >
                  {formatTime(recordingTime)}
                </div>
                <div className="text-xs mt-1" style={{ color: "#92400E" }}>
                  זמן מושהה
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="w-full rounded-xl px-6 py-3 font-semibold shadow-lg flex items-center justify-center gap-3 transition-all duration-200"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--color-primary), var(--color-primary-dark))",
                  color: "white",
                }}
                onClick={onMainButtonClick}
              >
                <FiPlay size={20} />
                המשך הקלטה
              </button>

              <div className="flex gap-3">
                <button
                  className="flex-1 rounded-xl px-4 py-3 font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-muted, #E5E7EB)",
                    color: "var(--color-text)",
                  }}
                  onClick={onRestartRecording}
                >
                  <FiRefreshCw size={18} />
                  מחדש
                </button>
                <button
                  className="flex-1 rounded-xl px-4 py-3 font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }}
                  onClick={onStopRecording}
                >
                  <FiCheckCircle size={18} />
                  סיום
                </button>
              </div>
            </div>
          </div>
        )}

        {/* מצב Finished */}
        {recordingPhase === "finished" && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FiCheckCircle size={24} style={{ color: "var(--color-primary)" }} />
              <span style={{ color: "var(--color-primary-dark)" }} className="font-bold text-lg">
                הקלטה הושלמה!
              </span>
            </div>

            <div
              className="rounded-2xl px-6 py-3 border shadow-inner text-center"
              style={{
                backgroundImage: "linear-gradient(to right, #D1FAE5, #99F6E4)", // ירוק עדין
                borderColor: "#A7F3D0",
              }}
            >
              <div
                className="font-mono text-xl font-bold tracking-wider"
                style={{ color: "#065F46" }}
              >
                {formatTime(recordingTime)}
              </div>
              <div className="text-xs mt-1" style={{ color: "#047857" }}>
                משך ההקלטה
              </div>
            </div>

            {audioBlob && (
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "var(--color-muted, #F3F4F6)",
                  borderColor: "var(--color-border)",
                }}
              >
                <audio
                  controls
                  className="w-full h-10 rounded-lg"
                  style={{ backgroundColor: "white", border: "1px solid var(--color-border)" }}
                >
                  <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                  הדפדפן שלך לא תומך בניגון אודיו.
                </audio>
              </div>
            )}

            {/* כפתורי פעולה */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={onSave}
                title="שמור הקלטה"
                className="flex items-center justify-center gap-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-base px-5 py-3"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                <FiSave size={22} />
                שמור
              </button>
              <button
                onClick={onDownload}
                title="הורד קובץ"
                className="flex items-center justify-center gap-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-base px-5 py-3"
                style={{
                  backgroundColor: "var(--color-primary-dark)",
                  color: "white",
                }}
              >
                <FiDownload size={22} />
                הורד
              </button>
              <button
                onClick={onRestartRecording}
                title="מחק והתחל מחדש"
                className="flex items-center justify-center gap-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-base px-5 py-3"
                style={{
                  backgroundColor: "#E53E3E", // אדום בולט
                  color: "white",
                }}
              >
                <FiTrash2 size={22} />
                מחק
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordButton;
