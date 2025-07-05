// import { useSharedRecordings } from '../features/shared-recordings/hooks/useSharedRecordings'
// import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard'


// export default function SharedRecordingsPage() {
//   const { data, isLoading } = useSharedRecordings();

// console.log("data = ", data);
// console.log("isArray?", Array.isArray(data));


//   if (isLoading) return <div>טוען...</div>;
//   if (!Array.isArray(data)) return <div>אין נתונים להצגה</div>;

//   return (
//     <div className="p-4 grid gap-4">
//       {data.map((recording) => (
//         <SharedRecordingCard key={recording.id} recording={recording} />
//       ))}
//     </div>
//   );
// }

import { useSelector } from 'react-redux';
import { RootState } from '../shared/store/store';
import { useSharedRecordings } from '../features/shared-recordings/hooks/useSharedRecordings';
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard';

export default function SharedRecordingsPage() {
  // const userId = useSelector((state: RootState) => state.auth.user?.id);
  //משתמש ששיתפו איתו
  const userId = 'cdb5a81b-3fbc-4355-8cab-3df28b160533'; 
  //משתמש קיים אבל לא שיתפו אותו
  //יחזיר את המשפט לא נמצאו הקלטות ששותפו איך
  // const userId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'; 

console.log("📡 שולחת בקשה עם userId:", userId);


  const { data, isLoading } = useSharedRecordings(userId || '');

  if (isLoading) return <div>טוען...</div>;
  if (!data || data.length === 0) return <div>אין הקלטות ששותפו איתך.</div>;

  return (
    <div className="p-4 grid gap-4">
      {data.map((recording) => (
        <SharedRecordingCard key={recording.id} recording={recording} />
      ))}
    </div>
  );
}

// import { useSharedRecordings } from '../features/shared-recordings/hooks/useSharedRecordings';
// import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard';

// export default function SharedRecordingsPage() {
//   const userId = 'user1'; // שימי את ה-id של המשתמש הנוכחי
//   const { data, isLoading } = useSharedRecordings(userId);

//   if (isLoading) return <div>טוען...</div>;
//   if (!data.length) return <div>אין הקלטות ששותפו איתך.</div>;

//   return (
//     <div className="p-4 grid gap-4">
//       {data.map((recording) => (
//         <SharedRecordingCard key={recording.id} recording={recording} />
//       ))}
//     </div>
//   );
// }
