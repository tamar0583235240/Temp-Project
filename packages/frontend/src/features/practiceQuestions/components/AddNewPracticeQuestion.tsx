import React, { useState } from 'react';
import { useAddPracticeQuestionMutation } from '../services/practiceQuestionsApi';
import { CreatePracticeQuestionRequest } from '../types/practiceQuestionTypes';
import { useSelector } from 'react-redux';
import { RootState } from "../../../shared/store/store";



const AddNewPracticeQuestion = () => {
  const [addPracticeQuestion, { isLoading, error }] = useAddPracticeQuestionMutation();
  const user = useSelector((state: RootState) => state.auth.user);


  const [formData, setFormData] = useState<CreatePracticeQuestionRequest>({
    content: '',
    difficulty: 'easy',
    type: 'free_text',
    created_by: user?.id || '',
    topic: '',
    hints: [{ content: '', generated_by_ai: false }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newHints = [...formData.hints];
    newHints[index].content = e.target.value;
    setFormData((prev) => ({ ...prev, hints: newHints }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addPracticeQuestion(formData).unwrap();
      alert(response.content);
    } catch (err) {
      console.error('Failed to save the question:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="תוכן השאלה"
        required
      />

      <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
        <option value="easy">קל</option>
        <option value="medium">בינוני</option>
        <option value="hard">קשה</option>
      </select>

      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="yes_no">כן/לא</option>
        <option value="free_text">טקסט חופשי</option>
        <option value="code">קטע קוד</option>
      </select>

      <input
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        placeholder="נושא"
        required
      />

      <label>רמזים:</label>
      {formData.hints.map((hint, i) => (
        <input
          key={i}
          value={hint.content}
          onChange={(e) => handleHintChange(e, i)}
          placeholder={`רמז ${i + 1}`}
        />
      ))}

      <button type="submit" disabled={isLoading}>הוסף שאלה</button>

      {error && <div style={{ color: 'red' }}>שגיאה בהוספת שאלה</div>}
    </form>
  );
};

export default AddNewPracticeQuestion;
