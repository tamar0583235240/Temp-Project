// import { SharedRecording } from '../types/types'
// import FeedbackSection from '../components/FeedbackSection'

// export default function SharedRecordingCard({ recording }: { recording: SharedRecording }) {
//   return (
//     <div className="border p-4 rounded-xl shadow-sm">
//       <h3 className="font-bold">{recording.title}</h3>
//       <audio controls src={recording.audioUrl} className="my-2" />
//       <div className="text-sm text-gray-600">{recording.aiInsights}</div>
//       <FeedbackSection recordingId={recording.id} />
//     </div>
//   );
// }

import { SharedRecording } from '../types/types';
import FeedbackSection from '../components/FeedbackSection';

export default function SharedRecordingCard({ recording }: { recording: SharedRecording }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white space-y-2">
      <div className="text-sm text-gray-600">
        <strong>שיתף:</strong> {recording.userName} | <strong>תאריך:</strong> {new Date(recording.date).toLocaleDateString()}
      </div>
      <h3 className="font-bold">{recording.questionTitle}</h3>
      <audio controls src={recording.audioUrl} className="my-2 w-full" />
      <div><strong>תובנות AI:</strong> {recording.aiSummary}</div>
      <FeedbackSection recordingId={recording.id} />
    </div>
  );
}
