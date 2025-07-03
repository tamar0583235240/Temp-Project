import { io } from "socket.io-client";
import { store } from '../store/store'; // ייבוא ה-store שלך
import { AdminQuestionApi } from '../../features/admin/services/adminQuestionApi'; // ייבוא ה-RTK Query שלך
import { log } from "console";

const socket = io("http://localhost:5002"); // שנה לכתובת השרת שלך

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("questionDeleted", (newData) => {
    // עדכון ה-cache ב-Redux
    console.log("I updated the cache");
    
    store.dispatch(AdminQuestionApi.util.updateQueryData('getAllQuestions', undefined, () => newData));
});

export default socket;
