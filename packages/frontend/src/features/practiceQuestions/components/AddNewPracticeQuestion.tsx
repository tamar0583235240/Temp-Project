
import React, { useState } from 'react';
import { useAddPracticeQuestionMutation, useGetTopicsQuery } from '../services/practiceQuestionsApi';
import { CreatePracticeQuestionRequest } from '../types/practiceQuestionTypes';
import { useSelector } from 'react-redux';
import { RootState } from "../../../shared/store/store";
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { useMessageModal } from '../../../shared/ui/MessageModalContext';
import { FaPlus, FaTimes, FaTrash, FaSave } from 'react-icons/fa';

interface AddNewPracticeQuestionProps {
  isOpen: boolean;
  onClose: () => void;
}

// נושאים קיימים - אפשר להעביר אותם כ-props או לטעון מה-API



const AddNewPracticeQuestion = ({ isOpen, onClose }: AddNewPracticeQuestionProps) => {
  const [addPracticeQuestion, { isLoading, error }] = useAddPracticeQuestionMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const { showMessage } = useMessageModal();
  const [isCustomTopic, setIsCustomTopic] = useState(false);

  const {
    data: topics = [],
    isLoading: isTopicsLoading,
    error: topicsError,
    refetch: refetchTopics,

  } = useGetTopicsQuery();


  const initialFormData: CreatePracticeQuestionRequest = {
    content: '',
    difficulty: 'easy',
    type: 'free_text',
    created_by: user?.id || '',
    topic: '',
    hints: [{ content: '', generated_by_ai: false }],
  };

  const [formData, setFormData] = useState<CreatePracticeQuestionRequest>(initialFormData);
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomTopic(true);
      setFormData((prev) => ({ ...prev, topic: '' }));
    } else {
      setShowCustomTopic(false);
      setFormData((prev) => ({ ...prev, topic: value }));
    }
  };

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTopic(value);
    setFormData((prev) => ({ ...prev, topic: value }));
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newHints = [...formData.hints];
    newHints[index].content = e.target.value;
    setFormData((prev) => ({ ...prev, hints: newHints }));
  };

  const addHint = () => {
    setFormData((prev) => ({
      ...prev,
      hints: [...prev.hints, { content: '', generated_by_ai: false }]
    }));
  };

  const removeHint = (index: number) => {
    if (formData.hints.length > 1) {
      const newHints = formData.hints.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, hints: newHints }));
    }
  };

  const handleResetForm = () => {
    setShowResetConfirm(true);
  };

  const confirmResetForm = () => {
    setFormData(initialFormData);
    setShowCustomTopic(false);
    setCustomTopic('');
    setShowResetConfirm(false);
    showMessage('הצלחה', 'הטופס נוקה בהצלחה');
  };

  const cancelResetForm = () => {
    setShowResetConfirm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // סינון רמזים ריקים
    const filteredHints = formData.hints.filter(hint => hint.content.trim() !== '');
    const dataToSubmit = {
      ...formData,
      hints: filteredHints.length > 0 ? filteredHints : [{ content: '', generated_by_ai: false }]
    };

    try {
      const response = await addPracticeQuestion(dataToSubmit).unwrap();
      showMessage('הצלחה', 'השאלה נוספה בהצלחה');
      refetchTopics();
      // איפוס הטופס
      setFormData(initialFormData);
      setShowCustomTopic(false);
      setCustomTopic('');
      onClose();
    } catch (err) {
      console.error('Failed to save the question:', err);
      showMessage('שגיאה', 'שגיאה בהוספת השאלה');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-main">הוספת שאלה מקצועית</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* תוכן השאלה - תיבת טקסט מורחבת */}
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              תוכן השאלה *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="הכנס את תוכן השאלה כאן..."
              required
              rows={4}
              className="w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary] resize-vertical min-h-[100px]"
            />
          </div>

          {/* רמת קושי */}
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              רמת קושי
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]"
            >
              <option value="easy">קל</option>
              <option value="medium">בינוני</option>
              <option value="hard">קשה</option>
            </select>
          </div>

          {/* סוג השאלה */}
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              סוג השאלה
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]"
            >
              <option value="yes_no">כן/לא</option>
              <option value="free_text">טקסט חופשי</option>
              <option value="code">קטע קוד</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              נושא
            </label>

            {!isCustomTopic ? (
              isTopicsLoading ? (
                <p className="text-sm text-gray-500">טוען נושאים...</p>
              ) : topicsError ? (
                <p className="text-sm text-red-500">שגיאה בטעינת הנושאים</p>
              ) : (
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={(e) => {
                    if (e.target.value === 'custom') {
                      setIsCustomTopic(true);
                      setFormData((prev) => ({ ...prev, topic: '' }));
                    } else {
                      setFormData((prev) => ({ ...prev, topic: e.target.value }));
                    }
                  }}
                  className="w-full rounded-md border border-[--color-border] px-3 py-2 text-sm z-50 relative"
                  required 
                >
                  <option value="" disabled>בחרי נושא</option>
                  {topics?.map((topic: { id: string; name: string }) => (
                    <option key={topic.id} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
                  <option value="custom">+ הוסיפי נושא חדש</option>
                </select>
               

              )
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="הקלידי נושא חדש"
                  required
                />
                <Button type="button" variant="outline" onClick={() => setIsCustomTopic(false)}>
                  חזרה לבחירה
                </Button>
              </div>
            )}
          </div>

          {/* רמזים */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-text-main">
                רמזים
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addHint}
                icon={<FaPlus />}
                iconPosition="left"
              >
                הוסף רמז
              </Button>
            </div>

            <div className="space-y-3">
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={hint.content}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHintChange(e, index)}
                    placeholder={`רמז ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.hints.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHint(index)}
                      className="text-danger hover:text-danger"
                    >
                      <FaTimes />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {formData.hints.length === 0 && (
              <p className="text-sm text-text-secondary mt-2">
                לא הוגדרו רמזים לשאלה זו
              </p>
            )}
          </div>

          {/* כפתורי פעולה */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[--color-border]">
            {/* כפתור הוספת שאלה - רחב וברור */}
            <Button
              type="submit"
              variant="primary-dark"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
              icon={<FaSave />}
              iconPosition="left"
              className="text-lg font-bold py-4"
            >
              {isLoading ? 'מוסיף שאלה...' : 'הוסף שאלה מקצועית'}
            </Button>

            {/* כפתור ניקוי טופס */}
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleResetForm}
              icon={<FaTrash />}
              iconPosition="left"
              className="self-start"
            >
              נקה טופס
            </Button>
          </div>

          {error && (
            <div className="text-danger text-sm mt-2 p-3 bg-red-50 rounded-md border border-red-200">
              שגיאה בהוספת שאלה
            </div>
          )}
        </form>

        {/* מודל אישור ניקוי טופס */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-text-main mb-4">אישור ניקוי טופס</h3>
              <p className="text-text-secondary mb-6">
                האם את בטוחה שאת רוצה לנקות את כל השדות? פעולה זו לא ניתנת לביטול.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="danger"
                  onClick={confirmResetForm}
                  className="flex-1"
                >
                  כן, נקה טופס
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelResetForm}
                  className="flex-1"
                >
                  ביטול
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewPracticeQuestion;


