import { useState } from 'react';

export default function FeedbackSection({ recordingId }: { recordingId: string }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const submit = () => {
    fetch(`/api/feedback/${recordingId}`, {
      method: 'POST',
      body: JSON.stringify({ rating, text }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div className="mt-2">
      <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(+e.target.value)} />
      <textarea placeholder="פידבק..." value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={submit}>שליחה</button>
    </div>
  );
}
