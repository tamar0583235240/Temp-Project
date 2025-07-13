import { useState } from "react";
import { FeedbackToSystem } from "../types/FeedbackToSystem";
import { FaStar, FaUpload, FaTimes, FaEdit } from "react-icons/fa";
import { useUpdateFeedbackToSystemMutation } from "../services/feedbackToSystemApi";
import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { CardSimple } from "../../../shared/ui/card";
import { Heading2 } from "../../../shared/ui/typography";
import { ToggleSwitch } from "../../../shared/ui/ToggleSwitch";
import { Spinner } from "../../../shared/ui/Spinner";
import { IconWrapper } from "../../../shared/ui/IconWrapper";

export const UpdateFeedbackToSystem = ({
    feedback,
    onClose,
}: {
    feedback: FeedbackToSystem;
    onClose: Function;
}) => {
    const [formData, setFormData] = useState({ ...feedback });
    const [updateFeedbackToSystem, { isLoading }] = useUpdateFeedbackToSystemMutation();
    const { showMessage } = useMessageModal();

    const handleStarChange = (field: keyof FeedbackToSystem, value: number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                file_upload_path: e.target.files![0].name,
            }));
        }
    };

    const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateFeedbackToSystem(formData).unwrap();
            showMessage("הצלחה!", "הפידבק עודכן בהצלחה");
            onClose();
        } catch (e) {
            console.error('שגיאה בעדכון הפידבק:', e);
            showMessage("שגיאה", `שגיאה בעדכון הפידבק: ${e}`);
        }
    };

    const renderStarRating = (field: keyof FeedbackToSystem, label: string) => {
        const rating = formData[field] as number;
        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main">{label}</label>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            className={`cursor-pointer text-xl transition-colors ${
                                star <= rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                            onClick={() => handleStarChange(field, star)}
                        />
                    ))}
                    <span className="mr-2 text-sm text-text-secondary">({rating}/5)</span>
                </div>
            </div>
        );
    };

    const renderTextArea = (name: string, label: string, placeholder?: string) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-text-main">{label}</label>
            <textarea
                name={name}
                value={formData[name as keyof FeedbackToSystem] as string}
                onChange={handleInputChange}
                placeholder={placeholder}
                rows={3}
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:ring-primary-dark focus:border-primary-dark resize-none"
            />
        </div>
    );

    const renderInput = (name: string, label: string, placeholder?: string) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-text-main">{label}</label>
            <Input
                name={name}
                value={formData[name as keyof FeedbackToSystem] as string}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
                <CardSimple className="h-full flex flex-col p-0">
                    {/* Header - נעוץ למעלה */}
                    <div className="flex justify-between items-center p-6 border-b border-border flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <IconWrapper color="primary-dark" size="sm">
                                <FaEdit />
                            </IconWrapper>
                            <Heading2 className="!text-xl !font-bold !m-0">עדכון פידבק למערכת</Heading2>
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

                    {/* Content - גלילה */}
                    <div className="flex-1 overflow-y-auto">
                        <form onSubmit={handleEdit} className="p-6">
                            <div className="space-y-8">
                                {/* דירוגים */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-text-main border-b border-border pb-2">
                                        דירוגים
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderStarRating("general_experience_rating", "חוויית שימוש כללית")}
                                        {renderStarRating("relevance_rating", "רלוונטיות התוכן")}
                                        {renderStarRating("tips_quality_rating", "איכות הטיפים")}
                                        {renderStarRating("ai_analysis_usefulness_rating", "שימושיות ניתוח הבינה המלאכותית")}
                                        {renderStarRating("content_usability_rating", "שמישות התוכן")}
                                    </div>
                                </div>

                                {/* שדות טקסט */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-text-main border-b border-border pb-2">
                                        משובים וחוות דעת
                                    </h3>
                                    
                                    {renderTextArea(
                                        "liked_most",
                                        "מה אהבת במיוחד במערכת?",
                                        "שתף אותנו במה שהכי אהבת..."
                                    )}

                                    {renderTextArea(
                                        "suggestion_for_improvement",
                                        "הצעות לשיפור",
                                        "איך נוכל לשפר את המערכת?"
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderInput(
                                            "extra_simulation_topic",
                                            "נושא סימולציה נוסף",
                                            "איזה נושא תרצה לראות?"
                                        )}

                                        {renderInput(
                                            "missing_content_type",
                                            "סוג תוכן חסר",
                                            "איזה תוכן חסר לדעתך?"
                                        )}
                                    </div>

                                    {renderTextArea(
                                        "self_learning",
                                        "איך המערכת עזרה ללימוד עצמי?",
                                        "תאר את החוויה שלך..."
                                    )}

                                    {renderTextArea(
                                        "confidence_contribution",
                                        "איך המערכת תרמה לביטחון שלך?",
                                        "שתף את ההשפעה על הביטחון העצמי שלך..."
                                    )}

                                    {renderInput(
                                        "feature_idea",
                                        "רעיון לפיצ'ר חדש",
                                        "איזה פיצ'ר היית רוצה לראות?"
                                    )}

                                    {renderTextArea(
                                        "system_description_to_friend",
                                        "איך היית מתאר את המערכת לחבר?",
                                        "תאר במילים שלך..."
                                    )}
                                </div>

                                {/* קובץ מצורף */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-text-main border-b border-border pb-2">
                                        קובץ מצורף
                                    </h3>
                                    
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                        <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer text-sm text-text-secondary hover:text-primary-dark"
                                        >
                                            לחץ להעלת קובץ אחר
                                        </label>
                                        
                                        {/* הצגת קובץ קודם */}
                                        {formData.file_upload_path && (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-text-main font-medium">
                                                    קובץ נוכחי: {formData.file_upload_path.split('/').pop()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* אנונימי */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-text-main border-b border-border pb-2">
                                        הגדרות פרטיות
                                    </h3>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-text-main">פידבק אנונימי</p>
                                            <p className="text-sm text-text-secondary">
                                                האם לשלוח את הפידבק ללא פרטים מזהים?
                                            </p>
                                        </div>
                                        <ToggleSwitch
                                            checked={formData.is_anonymous}
                                            onToggle={() => setFormData(prev => ({ ...prev, is_anonymous: !prev.is_anonymous }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer - נעוץ למטה */}
                    <div className="flex justify-between gap-3 p-6 border-t border-border bg-gray-50 flex-shrink-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onClose()}
                            disabled={isLoading}
                            className="flex-1"
                        >
                            ביטול
                        </Button>
                        <Button
                            type="submit"
                            variant="primary-dark"
                            disabled={isLoading}
                            className="flex-1 min-w-[120px]"
                            onClick={handleEdit}
                        >
                            {isLoading ? <Spinner /> : "עדכן פידבק"}
                        </Button>
                    </div>
                </CardSimple>
            </div>
        </div>
    );
};