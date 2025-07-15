import { useMessageModal } from "../../../shared/ui/MessageModalContext";
import { useAddExperienceThanksMutation } from "../services/experienceThanksApi";
import { useAdddInterviewExperiencesMutation } from "../services/interviewExperiencesApi";
import { interviewExperiences } from "../types/interviewExperiences";
import { useState } from "react";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { CardSimple } from "../../../shared/ui/card";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { FaBriefcase, FaTimes, FaSave, FaCalendarAlt, FaUser, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from '../../../shared/store/store';

export const AddInterviewExperience = (props: {
    onClose: () => void;
    onSubmit: (interviewExperience: interviewExperiences) => void;
}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.id ?? '';
    const [addInterviewExperiences, { isLoading }] = useAdddInterviewExperiencesMutation();
    const { showMessage } = useMessageModal();
    const { onClose, onSubmit } = props;

    const [interviewExperience, setInterviewExperience] = useState<interviewExperiences>({
        id: '',
        company_name: '',
        position: '',
        interviewDate: new Date(),
        questions: '',
        tips: '',
        description: '',
        hired: false,
        rating: 0,
        anonymous: true,
        created_at: new Date(),
        user_id: userId,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (interviewExperience.rating === 0) {
            showMessage("שגיאה", "נא לבחור דירוג כוכבים לפני שליחת הטופס");
            return;
        }
    
        try {
            console.log(interviewExperience);
            await addInterviewExperiences(interviewExperience);
            showMessage("הצלחה!", "החוויה נוספה בהצלחה");
    
            setInterviewExperience({
                id: '',
                company_name: '',
                position: '',
                interviewDate: new Date(),
                questions: '',
                tips: '',
                description: '',
                hired: false,
                rating: 0,
                anonymous: true,
                created_at: new Date(),
                user_id: '',
            });
    
            onSubmit(interviewExperience);
            onClose();
        } catch (err) {
            showMessage("שגיאה", `שגיאה בהוספת החוויה: ${err}`);
        }
    };
    

    const handleInputChange = (field: keyof interviewExperiences, value: string | boolean | number) => {
        setInterviewExperience(prev => ({ ...prev, [field]: value }));
    };

    const handleRatingClick = (rating: number) => {
        setInterviewExperience(prev => ({ ...prev, rating }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl h-[90vh] bg-white border border-[--color-border] shadow-xl rounded-lg overflow-hidden">
                <div className="h-full overflow-y-auto">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[--color-border]">
                            <div className="flex items-center gap-3">
                                <IconWrapper size="md" color="primary-dark">
                                    <FaBriefcase />
                                </IconWrapper>
                                <h2 className="text-2xl font-bold text-[--color-text]">
                                    הוספת חוויית ראיון
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* פרטי החברה והתפקיד */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                        שם החברה *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={interviewExperience.company_name}
                                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
                                        placeholder="הכנס שם החברה"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                        תפקיד *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={interviewExperience.position}
                                        onChange={(e) => handleInputChange('position', e.target.value)}
                                        className="w-full px-4 py-3 border border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
                                        placeholder="הכנס את התפקיד"
                                    />
                                </div>
                            </div>

                            {/* תאריך ראיון */}
                            <div>
                                <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                    <IconWrapper size="sm" color="primary-dark" className="inline ml-2">
                                        <FaCalendarAlt />
                                    </IconWrapper>
                                    תאריך הראיון 
                                </label>
                                <input
                                    type="date"
                                    onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
                                />
                            </div>

                            {/* תיאור החוויה */}
                            <div>
                                <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                    תיאור החוויה 
                                </label>
                                <textarea
                                    rows={4}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all resize-none"
                                    placeholder="ספר על החוויה שלך מהראיון..."
                                />
                            </div>

                            {/* שאלות שנשאלו */}
                            <div>
                                <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                    שאלות שנשאלו בראיון 
                                </label>
                                <textarea
                                    rows={3}
                                    onChange={(e) => handleInputChange('questions', e.target.value)}
                                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all resize-none"
                                    placeholder="אילו שאלות נשאלו בראיון?"
                                />
                            </div>

                            {/* טיפים */}
                            <div>
                                <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                    טיפים והמלצות 
                                </label>
                                <textarea
                                    rows={3}
                                    onChange={(e) => handleInputChange('tips', e.target.value)}
                                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all resize-none"
                                    placeholder="איזה טיפים היית נותנת לאחרות?"
                                />
                            </div>

                            {/* דירוג */}
                            <div>
                                <label className="block text-sm font-semibold text-[--color-text] mb-2">
                                    רמת ההנאה מהראיון: 
                                </label>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_, index) => {
                                        const rating = interviewExperience.rating || 0;
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleRatingClick(index + 1)}
                                                className={`text-2xl transition-colors hover:scale-110 ${index < rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                                                    }`}
                                            >
                                                {index < rating ? '★' : '☆'}
                                            </button>
                                        );
                                    })}
                                    <span className="text-sm text-[--color-secondary-text] mr-2">
                                        ({interviewExperience.rating}/5)
                                    </span>
                                </div>
                            </div>

                            {/* אפשרויות נוספות */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="hired"
                                        onChange={(e) => handleInputChange('hired', e.target.checked)}
                                        className="w-5 h-5 text-[--color-primary] border-[--color-border] rounded focus:ring-[--color-primary]"
                                    />
                                    <label htmlFor="hired" className="text-sm font-medium text-[--color-text]">
                                        התקבלתי לעבודה 
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="anonymous"
                                        checked={interviewExperience.anonymous}
                                        onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                                        className="w-5 h-5 text-[--color-primary] border-[--color-border] rounded focus:ring-[--color-primary]"
                                    />
                                    <label htmlFor="anonymous" className="text-sm font-medium text-[--color-text]">
                                        פרסום אנונימי 
                                    </label>
                                </div>
                            </div>

                            {/* כפתורי פעולה */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-[--color-border]">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 text-[--color-secondary-text] border border-[--color-border] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    ביטול
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            שומר...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            פרסם חוויה
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
