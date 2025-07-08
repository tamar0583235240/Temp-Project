import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { useDeleteFeedbackToSystemMutation } from "../services/feedbackToSystemApi";



export const DeleteFeedbackToSystem = (props:{feedbackId: string,onClose: Function}) => {
    const { feedbackId,onClose } = props;
    const { showMessage } = useMessageModal();
    const [deleteFeedbackToSystem] = useDeleteFeedbackToSystemMutation();


    const handleDelete = async () => {
        try {
            await deleteFeedbackToSystem(feedbackId);
            showMessage("הצלחה", "השאלה נמחקה בהצלחה");
            onClose();
        } catch (error: any) {
            if( error?.status === 404 ) 
                showMessage("שגיאה", `אירעה שגיאה במחיקת השאלה: ${error?.data?.message || error?.message || 'שגיאה לא ידועה'}`);    
        }
    };
    
    return(
        <div>
            <p>מחיקת פידבק</p>
            <p>האם אתה בטוח שברצונך למחוק פידבק זה? פעולה  זו לא ניתנת לביטול</p>
            <button onClick={()=> onClose()}>ביטול</button>
            <button onClick={() => handleDelete()}>מחק</button>
        </div>
    )
}