import { useSharedRecordings } from '../features/shared-recordings/hooks/useSharedRecordings'
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard'


export default function SharedRecordingsPage() {
  const { data, isLoading } = useSharedRecordings();

console.log("data = ", data);
console.log("isArray?", Array.isArray(data));


  if (isLoading) return <div>טוען...</div>;
  if (!Array.isArray(data)) return <div>אין נתונים להצגה</div>;

  return (
    <div className="p-4 grid gap-4">
      {data.map((recording) => (
        <SharedRecordingCard key={recording.id} recording={recording} />
      ))}
    </div>
  );
}
