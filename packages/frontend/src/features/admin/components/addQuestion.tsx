import { useState } from "react"
import { useAddQuestionMutation } from "../services/adminQuestionApi"

export const AddQuestion = () => {
    const [addQuestion, { isLoading, isSuccess, isError, error }] = useAddQuestionMutation()
    const [newQuestion, setNewQuestion] = useState({
        id: "00000000-0000-0000-0000-000000000000",
        title: "",
        content: "",
        category: "",
        tips: "",
        aiGuidance: "",
        isActive: true
    })

    const [flapOpen, setFlapOpen] = useState(false)

    function setTimeOutForOpen(): void {
        setFlapOpen(true)
        setTimeout(() => {
            setFlapOpen(false)
        }, 2000);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // מונע את רענון הדף
        addQuestion(newQuestion)
        setTimeOutForOpen()
    };

    return <div>
        <button onClick={()=>setFlapOpen(true)}>הוספת שאלה</button>
        <dialog open={flapOpen}>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <h3>הוספת שאלה למאגר השאלות</h3><br></br>
                <label htmlFor="name">שם השאלה</label><br></br>
                <input onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })} required type="text" placeholder="שם השאלה" id="name" /><br></br>
                <label htmlFor="contect">תוכן השאלה</label><br></br>
                <input onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })} required type="text" placeholder="תוכן השאלה" id="contect" /><br></br>
                <label htmlFor="category">קטגוריה</label><br></br>
                <input onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })} required type="text" placeholder="קטגוריה" id="category" /><br></br>
                <label htmlFor="tipes">טיפים למענה</label><br></br>
                <input onChange={(e) => setNewQuestion({ ...newQuestion, tips: e.target.value })} required type="text" placeholder="טיפים" id="tipes" /><br></br>
                <label htmlFor="AIin">הוראות AIל</label><br></br>
                <input onChange={(e) => setNewQuestion({ ...newQuestion, aiGuidance: e.target.value })} required type="text" placeholder="הוראות AIל" id="AIin" /><br></br>
                {/* <label htmlFor="isActive">פעיל</label><br></br>
            <input onChange={(e) => setNewQuestion({...newQuestion ,isActive:e.target.value})} required type="text" placeholder="פעיל" id="isActive"/><br></br> */}
                <button type="submit">הוסף שאלה</button>
            </form>
            {isSuccess && flapOpen && <p>השאלה נוספה בהצלחה!</p>}
            {isError && error && flapOpen && <p>שגיאה בהוספת השאלה: {error.toString()}</p>}
            <button onClick={() => setFlapOpen(false)}>סגירה</button>
        </dialog>
    </div>
}
