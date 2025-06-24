import { useSharedRecordings } from '../features/shared-recordings/hooks/useSharedRecordings'
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard'


export default function SharedRecordingsPage() {
  const { data, isLoading } = useSharedRecordings();

  if (isLoading) return <div>טוען...</div>;

  return (
    <div className="p-4 grid gap-4">
      {/* {data.map((recording) => (
        <SharedRecordingCard key={recording.id} recording={recording} />
      ))} */}
      <h1>hello for tamar</h1>
    </div>
  );
}
