import React, { useState } from 'react';
import { useRecording } from '../hooks/useRecording';
import { formatTime } from '../../../shared/utils/timeUtils';
import { Button } from '../../../shared/ui/button';
import { FiMic, FiPause, FiPlay, FiTrash2, FiDownload, FiRefreshCw, FiCheck, FiRotateCcw } from 'react-icons/fi';

import type { RecordingState } from '../types/Answer';
import RecordButton from './RecordButton';
import TipsComponent from '../../interview/components/tipsComponent';
import AnswerAI from '../../interview/components/AnswerAI';

type AudioRecorderProps = {
  userId?: string;
  questionId?: string;
  onFinish?: () => void;
  onSaveSuccess?: (answerId: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  userId = '550e8400-e29b-41d4-a716-446655440005',
  questionId = '00ca827f-f7a4-4449-8abc-64f84ce23dad',
  onFinish,
  onSaveSuccess
}) => {
  const {
    currentRecording,
    isLoading,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    restartRecording,
    saveRecording,
    audioBlobRef,
  } = useRecording() as ReturnType<typeof useRecording> & {
    currentRecording: RecordingState;
  };

  const [fileName, setFileName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [recordingPhase, setRecordingPhase] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [isRecordDisabled, setIsRecordDisabled] = useState(false);


  const handleMainButtonClick = () => {
    if (recordingPhase === 'idle') {
      startRecording();
      setRecordingPhase('recording');
      setIsRecordDisabled(false);
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
  setRecordingPhase('idle');
  setIsRecordDisabled(true);
  onFinish?.(); // מודיע לדף הראשי שסיימנו הקלטה
};

  const handleSaveRecording = async () => {
    try {
      const answer = await saveRecording(userId, questionId, fileName);
      setShowSaveModal(false);
      setFileName('');
      if (onSaveSuccess && answer && answer.id) {
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
      {/* כפתור התחלה / עצירה */}
      <RecordButton
        state={recordingPhase}
        onClick={handleMainButtonClick}
        disabled={isRecordDisabled}
      />

      {/* זמן הקלטה */}
      {(recordingPhase === 'recording' || recordingPhase === 'paused') && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-bold text-text-main">
            {formatTime(currentRecording.recordingTime)}
          </div>
        </div>
      )}

      {/* כפתורי שליטה בהקלטה */}
      {recordingPhase === 'paused' && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            fullWidth
            variant="primary-dark"
            onClick={() => {
              resumeRecording();
              setRecordingPhase('recording');
              setIsRecordDisabled(false);
            }}
            icon={<FiPlay />}
            className="gap-2"
          >
            המשך
          </Button>
          <Button
            size="sm"
            fullWidth
            variant="outline"
            onClick={() => {
              restartRecording();
              setRecordingPhase('recording');
              setIsRecordDisabled(false);
            }}
            icon={<FiRotateCcw />}
            className="gap-2"
          >
            מחדש
          </Button>
          <Button
            size="sm"
            fullWidth
            variant="danger"
            onClick={() => {
              deleteRecording();
              setRecordingPhase('idle');
              setIsRecordDisabled(false);
            }}
            icon={<FiTrash2 />}
            className="gap-2"
          >
            מחק
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

      {/* נגן + אפשרויות שמירה והורדה */}
      {audioBlobRef.current && (
        <div className="space-y-2">
          <h4 className="font-semibold text-text-main">תצוגה מקדימה:</h4>
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
