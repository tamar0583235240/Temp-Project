import { useState } from 'react';
import { Question } from '../types/Question';
import { useUpdateQuestionMutation } from '../services/adminQuestionApi';

export const UpdateQuestion = (props: { question: Question, questionSaveClick: Function })=>
{
    const { question, questionSaveClick } = props;
    const [updateQuestionById] = useUpdateQuestionMutation();
    const [questionU,setQuestionU]=useState(question);
    const [titleQ, setTitleQ] = useState(questionU.title);
    const [contentQ, seteContentQ] = useState(questionU.content);
    const [categoryQ, setCategoryQ] = useState(questionU.category);
    const [tipsQ, setTipsQ] = useState(questionU.tips);
    const [ai_guidanceQ, setAi_guidanceQ] = useState(questionU.ai_guidance);



        const updateQuestionF =async (event: any) => {
            event.preventDefault();
            const UpdateQuestionn:Partial<Question> = {
                id:question.id,
                title: titleQ,
                content: contentQ,
                category: categoryQ,
                tips: tipsQ,
                ai_guidance: ai_guidanceQ,
                is_active: true
            };
        
            try {
                const updatedQuestion=await updateQuestionById(UpdateQuestionn).unwrap();
                console.log(question.id);   
                console.log(UpdateQuestionn);             
                // setQuestionU(updatedQuestion);
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
            <button type="submit">שמור</button>
        </form>
    );
};
