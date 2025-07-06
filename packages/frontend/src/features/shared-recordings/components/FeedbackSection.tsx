
// import { useCreateFeedbackMutation } from '../services/sharedRecordingsApi';
// import { useState } from 'react';

// export default function FeedbackSection({ recordingId }: { recordingId: string }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

//   const submit = async () => {
//     try {
//       await createFeedback({ answerId: recordingId, rating, comment }).unwrap();
//       alert('Feedback sent!');
//     } catch (error) {
//       console.error('Error sending feedback:', error);
//       alert('שגיאה בשליחה');
//     }
//   };

//   return (
//     <div className="mt-2 space-y-2">
//       <input
//         type="number"
//         min={1}
//         max={5}
//         value={rating}
//         onChange={(e) => setRating(+e.target.value)}
//       />
//       <textarea
//         placeholder="פידבק..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         className="w-full border p-2"
//       />
//       <button onClick={submit} disabled={isLoading}>
//         שליחה
//       </button>
//     </div>
//   );
// }

export {};
