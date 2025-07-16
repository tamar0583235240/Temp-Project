// import React, { useState } from 'react';
// import { useAddPracticeQuestionMutation, useEditPracticeQuestionMutation, useGetTopicsQuery } from '../services/practiceQuestionsApi';
// import { PracticeQuestion, PracticeQuestionRequest } from '../types/practiceQuestionTypes';
// import { useSelector } from 'react-redux';
// import { RootState } from "../../../shared/store/store";
// import { Button } from '../../../shared/ui/button';
// import { Input } from '../../../shared/ui/input';
// import { useMessageModal } from '../../../shared/ui/MessageModalContext';
// import { FaPlus, FaTimes, FaTrash, FaSave } from 'react-icons/fa';
// import { Select } from '../../../shared/ui/Select';

// interface AddNewPracticeQuestionProps {
//   isOpen: boolean;
//   action: 'edit' | 'add';
//   onClose: () => void;
//   initialData?:PracticeQuestion
// }

// const AddNewPracticeQuestion = ({ 
//   isOpen, action, onClose, initialData 
// }: AddNewPracticeQuestionProps) => {
//   const [addPracticeQuestion, { isLoading, error }] = useAddPracticeQuestionMutation();
//   const [editPracticeQuestion] = useEditPracticeQuestionMutation();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const { showMessage } = useMessageModal();
//   const [isCustomTopic, setIsCustomTopic] = useState(false);

//   const {
//     data: topics = [],
//     isLoading: isTopicsLoading,
//     error: topicsError,
//     refetch: refetchTopics,
//   } = useGetTopicsQuery();

//   const getInitialFormData = (): PracticeQuestionRequest => {
//     if (action === 'edit' && initialData) {
//       return {
//         id: initialData.id,
//         content: initialData.content,
//         difficulty: initialData.difficulty,
//         type: initialData.type,
//         created_by: initialData.created_by,
//         topic: initialData.topic,
//         // topic: "",
//         hints: initialData.hints.length > 0 ? initialData.hints : [{ content: '', generated_by_ai: false }],
//       };
//     }

//     return {
//       content: '',
//       difficulty: 'easy',
//       type: 'free_text',
//       created_by: user?.id || '',
//       topic: { id: '', name: '', created_at: '' },
//       hints: [{ content: '', generated_by_ai: false }],
//     };
//   };

//   const [formData, setFormData] = useState<PracticeQuestionRequest>(getInitialFormData);
//   const [customTopic, setCustomTopic] = useState('');
//   const [showResetConfirm, setShowResetConfirm] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const newHints = [...formData.hints];
//     newHints[index].content = e.target.value;
//     setFormData((prev) => ({ ...prev, hints: newHints }));
//   };

//   const addHint = () => {
//     setFormData((prev) => ({
//       ...prev,
//       hints: [...prev.hints, { content: '', generated_by_ai: false }]
//     }));
//   };

//   const removeHint = (index: number) => {
//     if (formData.hints.length > 1) {
//       const newHints = formData.hints.filter((_, i) => i !== index);
//       setFormData((prev) => ({ ...prev, hints: newHints }));
//     }
//   };

//   const handleResetForm = () => {
//     setShowResetConfirm(true);
//   };

//   const confirmResetForm = () => {
//     setFormData(getInitialFormData);
//     setIsCustomTopic(false);
//     setCustomTopic('');
//     setShowResetConfirm(false);
//     showMessage('הצלחה', 'הטופס נוקה בהצלחה');
//   };

//   const cancelResetForm = () => {
//     setShowResetConfirm(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // סינון רמזים ריקים לפני השליחה
//     const filteredHints = formData.hints.filter(hint => hint.content.trim() !== '');

//     const dataToSubmit = {
//       ...formData,
//       hints: filteredHints, // שולח רק רמזים עם תוכן
//     };

//     try {
//       if(action === 'add'){
//         await addPracticeQuestion(dataToSubmit).unwrap();
//         showMessage('success', 'השאלה נוספה בהצלחה');
//       }
//       if(action === 'edit'){
//         await editPracticeQuestion(dataToSubmit).unwrap();
//         showMessage('success', 'השאלה נוספה בהצלחה');
//       }     
//       refetchTopics();
//       // איפוס הטופס
//       setFormData(getInitialFormData);
//       setIsCustomTopic(false);
//       setCustomTopic('');
//       onClose();
//     } catch (err) {
//       console.error('Failed to save the question:', err);
//       showMessage('error', 'שגיאה בהוספת השאלה');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-text-main">{action === 'add'? "הוספת שאלה מקצועית" : "עריכת שאלה מקצועית"}</h2>
//           <Button variant="ghost" onClick={onClose}>✕</Button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div>
//             <label className="block text-sm font-medium text-text-main mb-2">תוכן השאלה *</label>
//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               placeholder="הכנס את תוכן השאלה כאן..."
//               required
//               rows={4}
//               className="w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary] resize-vertical min-h-[100px]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-text-main mb-2">נושא</label>
//             {!isCustomTopic ? (
//               isTopicsLoading ? (
//                 <p className="text-sm text-gray-500">טוען נושאים...</p>
//               ) : topicsError ? (
//                 <p className="text-sm text-red-500">שגיאה בטעינת הנושאים</p>
//               ) : (
//                 <Select
//                   options={[
//                     { label: "בחרי נושא", value: "", disabled: true },
//                     ...topics.map((topic) => ({
//                       label: topic.name,
//                       value: topic.name,
//                     })),
//                     { label: "+ הוסיפי נושא חדש", value: "custom" },
//                   ]}
//                   value={formData.topic.name}
//                   onChange={(val) => {
//                     if (val === "custom") {
//                       setIsCustomTopic(true);
//                       setFormData((prev) => ({ ...prev, topic: "" }));
//                     } else {
//                       setFormData((prev) => ({ ...prev, topic: val }));
//                     }
//                   }}
//                   placeholder="בחרי נושא"
//                 />
//               )
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Input
//                   name="topic"
//                   value={formData.topic.name}
//                   onChange={handleChange}
//                   placeholder="הקלידי נושא חדש"
//                   required
//                 />
//                 <Button type="button" variant="outline" onClick={() => setIsCustomTopic(false)}>
//                   חזרה לבחירה
//                 </Button>
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-text-main mb-2">רמת קושי</label>
//             <Select
//               options={[
//                 { label: "קל", value: "easy" },
//                 { label: "בינוני", value: "medium" },
//                 { label: "קשה", value: "hard" },
//               ]}
//               value={formData.difficulty}
//               onChange={(val) =>
//                 setFormData((prev) => ({ ...prev, difficulty: val as "easy" | "medium" | "hard" }))
//               }
//               placeholder="בחרי רמת קושי"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-text-main mb-2">סוג השאלה</label>
//             <Select
//               options={[
//                 { label: "כן/לא", value: "yes_no" },
//                 { label: "טקסט חופשי", value: "free_text" },
//                 { label: "קטע קוד", value: "code" },
//               ]}
//               value={formData.type}
//               onChange={(val) =>
//                 setFormData((prev) => ({ ...prev, type: val as "free_text" | "yes_no" | "code" }))
//               }
//               placeholder="בחרי סוג שאלה"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-3">
//               <label className="block text-sm font-medium text-text-main">רמזים</label>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={addHint}
//                 icon={<FaPlus />}
//                 iconPosition="left"
//               >
//                 הוסף רמז
//               </Button>
//             </div>

//             <div className="space-y-3">
//               {formData.hints.map((hint, index) => (
//                 <div key={index} className="flex gap-2 items-center">
//                   <Input
//                     type="text"
//                     value={hint.content}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHintChange(e, index)}
//                     placeholder={`רמז ${index + 1}`}
//                     className="flex-1"
//                   />
//                   {formData.hints.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeHint(index)}
//                       className="text-danger hover:text-danger"
//                     >
//                       <FaTimes />
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {formData.hints.length === 0 && (
//               <p className="text-sm text-text-secondary mt-2">
//                 לא הוגדרו רמזים לשאלה זו
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col gap-3 pt-4 border-t border-[--color-border]">
//             <Button
//               type="submit"
//               variant="primary-dark"
//               size="lg"
//               fullWidth
//               isLoading={isLoading}
//               disabled={isLoading}
//               icon={<FaSave />}
//               iconPosition="left"
//               className="text-lg font-bold py-4"
//             >
//               {isLoading ? 'מוסיף שאלה...' : 'הוסף שאלה מקצועית'}
//             </Button>

//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={handleResetForm}
//               icon={<FaTrash />}
//               iconPosition="left"
//               className="self-start"
//             >
//               נקה טופס
//             </Button>
//           </div>

//           {error && (
//             <div className="text-danger text-sm mt-2 p-3 bg-red-50 rounded-md border border-red-200">
//               {action === 'add'?" שגיאה בהוספת שאלה":"שגיאה בעריכת שאלה"}
//             </div>
//           )}
//         </form>

//         {showResetConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//               <h3 className="text-lg font-bold text-text-main mb-4">אישור ניקוי טופס</h3>
//               <p className="text-text-secondary mb-6">
//                 האם את בטוחה שאת רוצה לנקות את כל השדות? פעולה זו לא ניתנת לביטול.
//               </p>
//               <div className="flex gap-3">
//                 <Button
//                   variant="danger"
//                   onClick={confirmResetForm}
//                   className="flex-1"
//                 >
//                   כן, נקה טופס
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={cancelResetForm}
//                   className="flex-1"
//                 >
//                   ביטול
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddNewPracticeQuestion;

import React, { useState } from 'react';
import { useAddPracticeQuestionMutation, useGetTopicsQuery } from '../services/practiceQuestionsApi';
import { PracticeQuestionRequestType } from '../types/practiceQuestionTypes';
import { useSelector } from 'react-redux';
import { RootState } from "../../../shared/store/store";
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { useMessageModal } from '../../../shared/ui/MessageModalContext';
import { FaPlus, FaTimes, FaTrash, FaSave } from 'react-icons/fa';
import { Select } from '../../../shared/ui/Select';

interface AddNewPracticeQuestionProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const initialFormData: PracticeQuestionRequestType = {
    content: '',
    difficulty: 'easy',
    type: 'free_text',
    created_by: user?.id || '',
    topic: '',
    hints: [{ content: '', generated_by_ai: false }],
  };

  const [formData, setFormData] = useState<PracticeQuestionRequestType>(initialFormData);
  const [customTopic, setCustomTopic] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    setIsCustomTopic(false);
    setCustomTopic('');
    setShowResetConfirm(false);
    showMessage('הצלחה', 'הטופס נוקה בהצלחה');
  };

  const cancelResetForm = () => {
    setShowResetConfirm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // סינון רמזים ריקים לפני השליחה
    const filteredHints = formData.hints.filter(hint => hint.content.trim() !== '');

    const dataToSubmit = {
      ...formData,
      hints: filteredHints, // שולח רק רמזים עם תוכן
    };

    try {
      await addPracticeQuestion(dataToSubmit).unwrap();
      showMessage('success', 'השאלה נוספה בהצלחה');
      refetchTopics();
      // איפוס הטופס
      setFormData(initialFormData);
      setIsCustomTopic(false);
      setCustomTopic('');
      onClose();
    } catch (err) {
      console.error('Failed to save the question:', err);
      showMessage('error', 'שגיאה בהוספת השאלה');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-main">הוספת שאלה מקצועית</h2>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-text-main mb-2">תוכן השאלה *</label>
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

          <div>
            <label className="block text-sm font-medium text-text-main mb-2">נושא</label>
            {!isCustomTopic ? (
              isTopicsLoading ? (
                <p className="text-sm text-gray-500">טוען נושאים...</p>
              ) : topicsError ? (
                <p className="text-sm text-red-500">שגיאה בטעינת הנושאים</p>
              ) : (
                <Select
                  options={[
                    { label: "בחרי נושא", value: "", disabled: true },
                    ...topics.map((topic) => ({
                      label: topic.name,
                      value: topic.name,
                    })),
                    { label: "+ הוסיפי נושא חדש", value: "custom" },
                  ]}
                  value={formData.topic}
                  onChange={(val) => {
                    if (val === "custom") {
                      setIsCustomTopic(true);
                      setFormData((prev) => ({ ...prev, topic: "" }));
                    } else {
                      setFormData((prev) => ({ ...prev, topic: val }));
                    }
                  }}
                  placeholder="בחרי נושא"
                />
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

          <div>
            <label className="block text-sm font-medium text-text-main mb-2">רמת קושי</label>
            <Select
              options={[
                { label: "קל", value: "easy" },
                { label: "בינוני", value: "medium" },
                { label: "קשה", value: "hard" },
              ]}
              value={formData.difficulty}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, difficulty: val }))
              }
              placeholder="בחרי רמת קושי"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-2">סוג השאלה</label>
            <Select
              options={[
                { label: "כן/לא", value: "yes_no" },
                { label: "טקסט חופשי", value: "free_text" },
                { label: "קטע קוד", value: "code" },
              ]}
              value={formData.type}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, type: val as "free_text" | "yes_no" | "code" }))
              }
              placeholder="בחרי סוג שאלה"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-text-main">רמזים</label>
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

          <div className="flex flex-col gap-3 pt-4 border-t border-[--color-border]">
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