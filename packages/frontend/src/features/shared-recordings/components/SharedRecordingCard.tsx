import { SharedRecording } from '../types/types'
import FeedbackSection from '../components/FeedbackSection'

export default function SharedRecordingCard({ recording }: { recording: SharedRecording }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm">
      <h3 className="font-bold">{recording.title}</h3>
      <audio controls src={recording.audioUrl} className="my-2" />
      <div className="text-sm text-gray-600">{recording.aiInsights}</div>
      <FeedbackSection recordingId={recording.id} />
    </div>
  );
}
