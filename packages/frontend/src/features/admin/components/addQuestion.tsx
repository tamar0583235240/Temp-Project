import { useState } from "react"
import { useAddQuestionMutation } from "../services/adminQuestionApi"

export const AddQuestion = () => {
    const [addQuestion] = useAddQuestionMutation()  
    const [newQuestion , serNewQuestion] = useState({
        title: "",
        content: "",
        category: "",
        tips: "",
        aiGuidance: "",
        isActive: true
    })

    return <div>
        <button>הוספת שאלה</button>
        <dialog>
        <form>
            <h3>הוספת שאלה למאגר השאלות</h3><br></br>
            <label>שם השאלה</label>
            <input required type="text" placeholder="שם השאלה" />
            <label>תוכן השאלה</label>
            <input required type="text" placeholder="תוכן השאלה" />
            <label>קטגוריה</label>
            <input type="text" placeholder="קטגוריה" />
            <label>טיפים למענה</label>
            <input type="text" placeholder="טיפים" />
            <label>הוראות AIל</label>
            <input type="text" placeholder="הוראות AIל" />
        </form>
        </dialog>
    </div>
}
