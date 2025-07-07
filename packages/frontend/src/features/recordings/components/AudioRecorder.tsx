import React, { useState } from 'react';
import { useRecording } from '../hooks/useRecording';
import { formatTime } from '../../../shared/utils/timeUtils';
import { Button } from '../../../shared/ui/button';
import { FiDownload, FiCheck, FiRotateCcw } from 'react-icons/fi';

import type { RecordingState } from '../types/Answer';
import RecordButton from './RecordButton';

type AudioRecorderProps = {
  userId?: string;
  questionId?: string;
  onFinish?: () => void;
  onSaveSuccess?: (answerId: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  userId = '00000000-0000-0000-0000-000000000000',
  questionId = '00000000-0000-0000-0000-000000000010',
  onFinish,
  onSaveSuccess,
}) => {
  const {
    currentRecording,
    isLoading,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    restartRecording,
    saveRecording,
    audioBlobRef,
  } = useRecording() as ReturnType<typeof useRecording> & {
    currentRecording: RecordingState;
  };

  const [fileName, setFileName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [recordingPhase, setRecordingPhase] = useState<
    'idle' | 'recording' | 'paused' | 'finished'
  >('idle');

  const handleMainButtonClick = () => {
    if (recordingPhase === 'idle' || recordingPhase === 'finished') {
      restartRecording();
      setRecordingPhase('recording');
    } else if (recordingPhase === 'recording') {
      pauseRecording();
      setRecordingPhase('paused');
    } else if (recordingPhase === 'paused') {
      resumeRecording();
      setRecordingPhase('recording');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setRecordingPhase('finished');
    onFinish?.();
  };

  const handleSaveRecording = async () => {
    try {
      const answer = await saveRecording(userId, questionId, fileName);
      setShowSaveModal(false);
      setFileName('');
      if (onSaveSuccess && answer?.id) {
        onSaveSuccess(answer.id);
      }
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
    }
  };

  const downloadRecording = () => {
    if (audioBlobRef.current) {
      const url = URL.createObjectURL(audioBlobRef.current);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'recording.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* כפתור ראשי */}
      <RecordButton
        state={recordingPhase}
        onClick={handleMainButtonClick}
      />

      {/* מונה זמן */}
      {(recordingPhase === 'recording' || recordingPhase === 'paused' ) && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-bold text-text-main">
            {formatTime(currentRecording.recordingTime)}
          </div>
        </div>
      )}

      {/* כפתורים בזמן עצירה זמנית */}
      {recordingPhase === 'paused' && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            fullWidth
            variant="outline"
            onClick={() => {
              restartRecording();
              setRecordingPhase('recording');
            }}
            icon={<FiRotateCcw />}
            className="gap-2"
          >
            מחדש
          </Button>
          <Button
            size="sm"
            fullWidth
            variant="primary-dark"
            onClick={handleStopRecording}
            icon={<FiCheck />}
            className="gap-2"
          >
            סיום
          </Button>
        </div>
      )}

      {/* תצוגה מקדימה + הורדה ושמירה */}
      {audioBlobRef.current && (
        <div className="space-y-2">
          <audio controls className="w-full rounded-lg border border-muted">
            <source src={URL.createObjectURL(audioBlobRef.current)} type="audio/wav" />
          </audio>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={downloadRecording}
              icon={<FiDownload />}
              iconPosition="right"
              fullWidth
            >
              הורד קובץ
            </Button>
            <Button
              variant="primary-dark"
              size="md"
              onClick={() => setShowSaveModal(true)}
              icon={<FiCheck />}
              fullWidth
            >
              שמור
            </Button>
          </div>
        </div>
      )}

      {/* מודל שמירה */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-text-main">שמירת הקלטה</h3>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="הזן שם לקובץ..."
              className="w-full border border-border rounded-lg px-4 py-2"
            />
            <div className="flex gap-4">
              <Button
                variant="primary-dark"
                fullWidth
                onClick={handleSaveRecording}
                disabled={!fileName.trim()}
                isLoading={isLoading}
              >
                שמור
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowSaveModal(false)}
              >
                ביטול
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
