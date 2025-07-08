import { FiMic, FiPause, FiPlay, FiRefreshCw } from "react-icons/fi";

type RecordButtonProps = {
  state: 'idle' | 'recording' | 'paused' | 'finished'; // ⬅️ הוספנו מצב חדש
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const RecordButton: React.FC<RecordButtonProps> = ({ state, onClick, className = '', disabled = false }) => {
  const isRecording = state === 'recording';

  const icon =
    isRecording ? <FiPause /> :
    state === 'paused' ? <FiPlay /> :
    state === 'finished' ? <FiRefreshCw /> :
    <FiMic />;

  const text =
    isRecording ? 'השהיה' :
    state === 'paused' ? 'המשך הקלטה' :
    state === 'finished' ? 'הקלט מחדש' :
    'התחלת הקלטה';

  const baseClasses =
    'w-full border px-6 py-3 rounded-lg font-semibold transition text-lg flex flex-row-reverse items-center justify-center gap-2';

  const stateClasses =
    state === 'recording'
      ? 'bg-red-600 text-white border-red-600 hover:brightness-110'
      : 'bg-primary-dark text-white border-primary-dark hover:brightness-110';

  return (
    <div className="w-full relative flex items-center justify-center">
      {isRecording && (
        <span
          className="absolute w-24 h-24 rounded-full bg-red-400 opacity-40 animate-pulse-wave pointer-events-none select-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}
        />
      )}
      <button
        onClick={onClick}
        className={`relative z-10 ${baseClasses} ${stateClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`.trim()}
        type="button"
        disabled={disabled}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default RecordButton;