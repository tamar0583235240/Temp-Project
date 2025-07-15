import { useState } from "react";
import { Button } from "../../../shared/ui/button";
import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { useDeleteInterviewExperiencesByIdMutation } from "../services/interviewExperiencesApi";

type CancelDisplayingReportProps = {
    idExpericence: string;
};

export const CancelDisplayingReport: React.FC<CancelDisplayingReportProps> = ({ idExpericence }) => {
    const [deleteInterviewExperience, { isLoading }] = useDeleteInterviewExperiencesByIdMutation();
    const { showMessage } = useMessageModal();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteInterviewExperience(idExpericence);
            showMessage("הצלחה", "הדיווח הוסר בהצלחה");
            setShowDeleteModal(false);
        } catch (error: any) {
            if (error?.status === 404) {
                showMessage("שגיאה", `אירעה שגיאה בהסרת הדיווח: ${error?.data?.message || error?.message || 'שגיאה לא ידועה'}`);
            } else {
                showMessage("שגיאה", "אירעה שגיאה בהסרת הדיווח");
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteClick}
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    }
                    iconPosition="right"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-200"
                >
                    הסרת הדיווח
                </Button>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-md text-right" dir="rtl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">הסרת דיווח</h2>
                        </div>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            האם אתה בטוח שברצונך להסיר את הדיווח על חוויית הראיון הזו? פעולה זו לא ניתנת לביטול.
                        </p>
                        
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={handleCancelDelete}
                                disabled={isLoading}
                            >
                                ביטול
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleConfirmDelete}
                                isLoading={isLoading}
                                icon={!isLoading ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                        />
                                    </svg>
                                ) : undefined}
                                iconPosition="right"
                            >
                                הסר דיווח
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
