import { useSharedRecordings } from './hooks/useSharedRecordings'
import SharedRecordingCard from './components/SharedRecordingCard'

export default function SharedRecordingsPage() {
  const { data, isLoading } = useSharedRecordings();

  if (isLoading) return <div>טוען...</div>;

  return (
    <div className="p-4 grid gap-4">
      {data.map((recording) => (
        <SharedRecordingCard key={recording.id} recording={recording} />
      ))}
    </div>
  );
}
