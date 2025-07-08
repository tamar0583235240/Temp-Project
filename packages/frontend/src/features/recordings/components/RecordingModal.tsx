// import React from 'react';
// import {
//   FiMic,
//   FiPause,
//   FiPlay,
//   FiRefreshCw,
//   FiCheckCircle,
//   FiTrash2,
//   FiDownload,
//   FiSave,
//   FiX,
//   FiSquare
// } from 'react-icons/fi';

// import { useRecording } from '../hooks/useRecording';
// import { formatTime } from '../../../shared/utils/timeUtils';

// type RecordingModalProps = {
//   open: boolean;
//   onClose: () => void;
//   onSave?: () => void;
//   onDownload?: () => void;
//   onDelete?: () => void;
// };

// const RecordingModal: React.FC<RecordingModalProps> = ({
//   open,
//   onClose,
//   onSave,
//   onDownload,
//   onDelete
// }) => {
//   const {
//     currentRecording,
//     startRecording,
//     pauseRecording,
//     resumeRecording,
//     stopRecording,
//     restartRecording,
//     audioBlobRef
//   } = useRecording();

//   const { isRecording, isPaused, recordingTime } = currentRecording;

//   const state: 'idle' | 'recording' | 'paused' | 'finished' =
//     isRecording
//       ? 'recording'
//       : isPaused
//       ? 'paused'
//       : audioBlobRef.current
//       ? 'finished'
//       : 'idle';

//   const handleModalClose = () => {
//     if (state === 'recording') {
//       pauseRecording();
//     }
//     onClose();
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center relative animate-fadeInUp border border-[--color-border]">

//         {/* סגור */}
//         <button
//           className="absolute left-6 top-6 text-[--color-secondary-text] hover:text-[--color-text] transition-colors duration-200 hover:bg-gray-100 rounded-full p-2"
//           onClick={handleModalClose}
//         >
//           <FiX size={20} />
//         </button>

//         {/* כותרת */}
//         <h2 className="text-2xl font-bold text-[--color-text] mb-2">הקלטת קול</h2>
//         <p className="text-[--color-secondary-text] text-sm mb-6">הקלט את התשובה שלך</p>

//         {/* מצב הקלטה */}
//         {state === 'idle' && (
//           <div className="space-y-6">
//             <FiMic size={48} className="text-[--color-primary]" />
//             <button onClick={startRecording} className="btn-primary w-full py-3 rounded-xl">
//               <FiMic className="inline-block mr-2" />
//               התחל הקלטה
//             </button>
//           </div>
//         )}

//         {state === 'recording' && (
//           <div className="space-y-6">
//             <div className="text-red-600 font-bold text-xl mb-2">מקליט...</div>
//             <div className="text-[--color-secondary-text] font-mono text-lg">{formatTime(recordingTime)}</div>

//             <div className="flex gap-3">
//               <button onClick={pauseRecording} className="flex-1 bg-yellow-500 text-white rounded-xl py-3">
//                 <FiPause className="inline-block mr-2" />
//                 השהה
//               </button>
//               <button onClick={stopRecording} className="flex-1 bg-red-600 text-white rounded-xl py-3">
//                 <FiSquare className="inline-block mr-2" />
//                 עצור
//               </button>
//             </div>
//           </div>
//         )}

//         {state === 'paused' && (
//           <div className="space-y-6">
//             <div className="text-yellow-600 font-bold text-lg">הקלטה מושהית</div>
//             <div className="text-[--color-secondary-text] font-mono text-lg">{formatTime(recordingTime)}</div>

//             <button onClick={resumeRecording} className="w-full bg-green-600 text-white rounded-xl py-3">
//               <FiPlay className="inline-block mr-2" />
//               המשך הקלטה
//             </button>

//             <div className="flex gap-3">
//               <button onClick={restartRecording} className="flex-1 bg-gray-500 text-white rounded-xl py-3">
//                 <FiRefreshCw className="inline-block mr-2" />
//                 מחדש
//               </button>
//               <button onClick={stopRecording} className="flex-1 bg-red-600 text-white rounded-xl py-3">
//                 <FiCheckCircle className="inline-block mr-2" />
//                 סיום
//               </button>
//             </div>
//           </div>
//         )}

//         {state === 'finished' && (
//           <div className="space-y-6">
//             <div className="text-green-600 font-bold text-lg">הקלטה הושלמה!</div>
//             <div className="text-[--color-secondary-text] font-mono text-sm">{formatTime(recordingTime)}</div>

//             <audio
//               controls
//               className="w-full border border-[--color-border] rounded-lg"
//               src={audioBlobRef.current ? URL.createObjectURL(audioBlobRef.current) : ''}
//             />

//             <div className="flex flex-col gap-3">
//               <button onClick={onSave} className="btn-primary w-full py-3 rounded-xl">
//                 <FiSave className="inline-block mr-2" />
//                 שמור הקלטה
//               </button>

//               <div className="flex gap-3">
//                 <button onClick={onDownload} className="flex-1 bg-blue-600 text-white rounded-xl py-3">
//                   <FiDownload className="inline-block mr-2" />
//                   הורד
//                 </button>
//                 <button onClick={restartRecording} className="flex-1 bg-gray-500 text-white rounded-xl py-3">
//                   <FiRefreshCw className="inline-block mr-2" />
//                   מחדש
//                 </button>
//                 <button onClick={onDelete} className="flex-1 bg-red-600 text-white rounded-xl py-3">
//                   <FiTrash2 className="inline-block mr-2" />
//                   מחק
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecordingModal;
