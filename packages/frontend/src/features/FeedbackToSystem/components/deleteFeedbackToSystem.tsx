import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { useDeleteFeedbackToSystemMutation } from "../services/feedbackToSystemApi";
import { Button } from "../../../shared/ui/button";
import { CardSimple } from "../../../shared/ui/card";
import { Heading2, Paragraph } from "../../../shared/ui/typography";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { Spinner } from "../../../shared/ui/Spinner";
import { FaTimes, FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";

export const DeleteFeedbackToSystem = (props: { feedbackId: string, onClose: Function }) => {
    const { feedbackId, onClose } = props;
    const { showMessage } = useMessageModal();
    const [deleteFeedbackToSystem, { isLoading }] = useDeleteFeedbackToSystemMutation();

    const handleDelete = async () => {
        try {
            await deleteFeedbackToSystem(feedbackId);
            showMessage("הצלחה", "הפידבק נמחק בהצלחה");
            onClose();
        } catch (error: any) {
            if (error?.status === 404) {
                showMessage("שגיאה", `אירעה שגיאה במחיקת הפידבק: ${error?.data?.message || error?.message || 'שגיאה לא ידועה'}`);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <CardSimple className="p-0">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-border">
                        <div className="flex items-center gap-3">
                            <IconWrapper color="danger" size="sm">
                                <FaTrashAlt />
                            </IconWrapper>
                            <Heading2 className="!text-lg !font-bold !m-0">מחיקת פידבק</Heading2>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onClose()}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="text-center space-y-4">
                            <IconWrapper color="danger" size="lg" className="mx-auto">
                                <FaExclamationTriangle />
                            </IconWrapper>
                            
                            <div className="space-y-2">
                                <Heading2 className="!text-xl !font-semibold !text-danger">
                                    האם אתה בטוח?
                                </Heading2>
                                <Paragraph className="text-text-secondary">
                                    פעולת המחיקה תמחק את הפידבק לצמיתות ולא ניתן יהיה לשחזר אותו.
                                </Paragraph>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between gap-3 p-6 border-t border-border bg-gray-50">
                        <Button
                            variant="outline"
                            onClick={() => onClose()}
                            disabled={isLoading}
                            className="flex-1"
                        >
                            ביטול
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="flex-1 min-w-[120px]"
                        >
                            {isLoading ? <Spinner /> : "מחק פידבק"}
                        </Button>
                    </div>
                </CardSimple>
            </div>
        </div>
    );
};
