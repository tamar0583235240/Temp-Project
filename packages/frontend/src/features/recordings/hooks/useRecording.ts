import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';
import { 
  setRecordingState, 
  setShowRecordingModal, 
  resetRecording,
  addAnswer 
} from '../store/recordingSlice';
import { useUploadAnswerMutation } from '../services/recordingApi';

export const useRecording = () => {
  const dispatch = useDispatch();
  const { currentRecording, showRecordingModal } = useSelector(
    (state: RootState) => state.recording  );  
  const [uploadAnswer, { isLoading }] = useUploadAnswerMutation();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // טיימר להקלטה
  useEffect(() => {
    if (currentRecording.isRecording && !currentRecording.isPaused) {
      timerRef.current = setInterval(() => {
        dispatch(setRecordingState({ 
          recordingTime: currentRecording.recordingTime + 1 
        }));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentRecording.isRecording, currentRecording.isPaused, currentRecording.recordingTime, dispatch]);

  const startRecording = async () => {
    if (currentRecording.audioBlob) {
      deleteRecording();
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        dispatch(setRecordingState({ audioBlob: blob }));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      dispatch(setRecordingState({ 
        isRecording: true, 
        isPaused: false, 
        recordingTime: 0 
      }));
      dispatch(setShowRecordingModal(true));
    } catch (error) {
      console.error('שגיאה בהתחלת הקלטה:', error);
      alert('לא ניתן לגשת למיקרופון');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && currentRecording.isRecording) {
      mediaRecorderRef.current.pause();
      dispatch(setRecordingState({ 
        isPaused: true, 
        isRecording: false 
      }));
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && currentRecording.isPaused) {
      mediaRecorderRef.current.resume();
      dispatch(setRecordingState({ 
        isPaused: false, 
        isRecording: true 
      }));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (currentRecording.isRecording || currentRecording.isPaused)) {
      mediaRecorderRef.current.stop();
      dispatch(setRecordingState({ 
        isRecording: false, 
        isPaused: false 
      }));
      dispatch(setShowRecordingModal(false));
    }
  };

  const deleteRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    dispatch(resetRecording());
  };

  const restartRecording = async () => {
    deleteRecording();
    await startRecording();
  };

  const saveRecording = async (fileName: string, userId: string, questionId: string) => {
    if (!currentRecording.audioBlob || !fileName.trim()) {
      alert('אנא הזן שם לקובץ');
      return;
    }

    const formData = new FormData();
    const fileNameWithExtension = fileName.endsWith('.wav') ? fileName : `${fileName}.wav`;

    formData.append('audioFile', currentRecording.audioBlob, fileNameWithExtension);
    formData.append('userId', userId);
    formData.append('questionId', questionId);

    try {
      const result = await uploadAnswer(formData).unwrap();
      dispatch(addAnswer(result));
      dispatch(resetRecording());
      return result;
    } catch (error) {
      console.error('שגיאה בשמירת ההקלטה:', error);
      throw error;
    }
  };

  return {
    currentRecording,
    showRecordingModal,
    isLoading,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    restartRecording,
    saveRecording,
  };
};