import { useState } from 'react';
import { Question } from '../types/Question';
import { useUpdateQuestionByIdMutation } from '../services/adminQuestionApi';

export const UpdateQuestion = (props: { question: Question, questionSaveClick: Function })=>
{
    const { question, questionSaveClick } = props;
    const [updateQuestionById] = useUpdateQuestionByIdMutation();
    const [questionU,setQuestionU]=useState(question);
    const [titleQ, setTitleQ] = useState(questionU.title);
    const [contentQ, seteContentQ] = useState(questionU.content);
    const [categoryQ, setCategoryQ] = useState(questionU.category);
    const [tipsQ, setTipsQ] = useState(questionU.tips);
    const [ai_guidanceQ, setAi_guidanceQ] = useState(questionU.ai_guidance);
    const [is_activeQ, setIs_activeQ] = useState(questionU.is_active);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const target = e.target as HTMLInputElement;
    //     const { name, value, type, checked } = target;
    //     const val = type === 'checkbox' ? checked : value;

        const updateQuestionF =async (event: any) => {
            event.preventDefault();
            const UpdateQuestionn = {
                title: titleQ,
                content: contentQ,
                category: categoryQ,
                tips: tipsQ,
                ai_guidance: ai_guidanceQ,
                is_active: is_activeQ
            };
            // setkeep(!keep);
            try {
                const updatedQuestion = await updateQuestionById({
                  id: question.id,
                  data: UpdateQuestionn,
                }).unwrap(); 
                setQuestionU(updatedQuestion);
                console.log(updatedQuestion);
                
              } catch (e) {
                console.error('שגיאה בעדכון השאלה:', e);
              }
              questionSaveClick();
            
        }

    return (
        <form onSubmit={updateQuestionF} style={{ direction: 'rtl', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>עריכת שאלה</h3>
            <label>כותרת:</label>
            <input type="text" name="title" value={titleQ} onChange={e=>setTitleQ(e.target.value)} />
            <label>תוכן:</label>
            <textarea name="content" value={contentQ} onChange={e=>seteContentQ(e.target.value)} />
            <label>קטגוריה:</label>
            <input type="text" name="category" value={categoryQ} onChange={e=>setCategoryQ(e.target.value)} />
            <label>טיפים:</label>
            <textarea name="tips" value={tipsQ} onChange={e=>setTipsQ(e.target.value)} />
            <label>הנחיות AI:</label>
            <textarea name="ai_guidance" value={ai_guidanceQ} onChange={e=>setAi_guidanceQ(e.target.value)} />
            <label>
                פעיל:
                <input
                    type="checkbox"
                    name="is_active"
                    checked={is_activeQ}
                    onChange={e=>setIs_activeQ(e.target.checked)}
                />
            </label>
            <button type="submit">שמור</button>
        </form>
    );
};
