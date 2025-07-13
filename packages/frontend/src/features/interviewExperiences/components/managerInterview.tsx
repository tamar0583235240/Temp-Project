import { useGetAllContentReportsQuery } from "../services/contentReportsApi";
import { CardSimple } from "../../../shared/ui/card";
import { Heading1 } from "../../../shared/ui/typography";
import { useCallback, useEffect, useState } from "react";
import { useGetAllInterviewExperiencesQuery } from "../services/interviewExperiencesApi";
import { CancelDisplayingReport } from "./CancelDisplayingReport";
import { FilterByField } from './filterByField';
import { FaFilter } from 'react-icons/fa';

type AdminQuestionsProps = {
    allowedRoles: string[];
    children: React.ReactNode;
};

export const ManagerInterview: React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {
    const { data: contentReports, isLoading: isContentReportsLoading } = useGetAllContentReportsQuery();
    const { data: allInterview, isLoading: isInterviewLoading } = useGetAllInterviewExperiencesQuery();
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
    const [filteredInterviews, setFilteredInterviews] = useState<any[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilteredResults = useCallback((filtered: any[]) => {
        setFilteredInterviews(filtered);
    }, []);

    useEffect(() => {
        setFilteredInterviews(allInterview || []);
    }, [allInterview]);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    if (isContentReportsLoading || isInterviewLoading) {
        return (
            <div className="min-h-screen bg-[--color-background]" dir="rtl">
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-[--color-border] border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-[--color-secondary-text] text-lg">טוען נתונים...</p>
                </div>
            </div>
        );
    }

    const numberOfContentReports = contentReports?.length || 0;
    const numberOfInterviews = allInterview?.length || 0;

    const getCardClasses = (count: number) => {
        if (count === 0) {
            return "bg-green-50 border-green-200 text-green-700";
        }
        if (count >= 1 && count <= 5) {
            return "bg-orange-50 border-orange-200 text-orange-700";
        }
        return "bg-red-50 border-red-200 text-red-700";
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="text-sm text-[--color-text] mr-2">({rating}/5)</span>
            </div>
        );
    };

    const hasContentReports = (experienceId: string) => {
        return contentReports && contentReports.some(r => r.experience_id === experienceId);
    };

    const openDescriptionModal = (description: string) => {
        setSelectedDescription(description);
    };

    const closeDescriptionModal = () => {
        setSelectedDescription(null);
    };

    return (
        <div className="min-h-screen bg-[--color-background]" dir="rtl">
            {/* כותרת עם כפתור סינון */}
            <div className="bg-[--color-background] border-b border-[--color-border]">
                <div className="py-8 px-4">
                    <div className="text-center relative">
                        <Heading1 className="text-[--color-text] mb-2">ניהול חוויות מראיונות</Heading1>

                        {/* כפתור סינון */}
                        <button
                            onClick={toggleFilter}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            <FaFilter className="w-4 h-4" />
                            <span className="text-sm font-medium">סינון</span>
                        </button>

                    </div>
                </div>
            </div>

            {/* קומפוננטת הסינון */}
            <FilterByField
                allInterview={allInterview || []}
                contentReports={contentReports || []}
                onFilteredResults={handleFilteredResults}
                isOpen={isFilterOpen}
                onClose={closeFilter}
            />

            <div className="py-8 px-4">
                {/* כרטיסי סטטיסטיקה */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
                    <CardSimple className="bg-blue-50 border-blue-200 text-blue-700 border-2 text-center">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">סך כל הראיונות</h3>
                            <div className="text-3xl font-bold">{numberOfInterviews}</div>
                            <p className="text-sm opacity-80">
                                {numberOfInterviews === 0 ? 'אין ראיונות' : 'ראיונות במערכת'}
                            </p>
                        </div>
                    </CardSimple>
                    <CardSimple className={`${getCardClasses(numberOfContentReports)} border-2 text-center`}>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">דיווחים על תוכן לא הולם</h3>
                            <div className="text-3xl font-bold">{numberOfContentReports}</div>
                            <p className="text-sm opacity-80">
                                {numberOfContentReports === 0 ? 'אין דיווחים' : 'דיווחים פעילים'}
                            </p>
                        </div>
                    </CardSimple>
                </div>

                {/* רשימת הראיונות */}
                {filteredInterviews.length > 0 ? (
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl font-semibold text-[--color-text] mb-6 text-center">
                            רשימת חוויות מראיונות
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredInterviews.map((interview, index) => {
                                const hasReports = hasContentReports(interview.id!);

                                return (
                                    <CardSimple
                                        key={interview.id || index}
                                        className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-[#00D6AD] bg-[#00D6AD]/5"
                                    >
                                        <CancelDisplayingReport idExpericence={interview.id} />
                                        {hasReports && (
                                            <div className="flex items-center gap-2 p-2 bg-red-100 border border-red-200 rounded-md mb-4">
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <span className="text-sm font-medium text-red-800">שיחה זו סומנה כלא הולמת</span>
                                            </div>
                                        )}
                                        <div className="space-y-4">
                                            <div className="overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <tbody className="divide-y divide-[--color-border]">
                                                        <tr>
                                                            <td className="py-2 px-3 font-medium text-[--color-secondary-text]">שם החברה:</td>
                                                            <td className="py-2 px-3 text-[--color-text] font-medium">
                                                                {interview.company_name || 'לא צוין'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-3 font-medium text-[--color-secondary-text]">תפקיד:</td>
                                                            <td className="py-2 px-3 text-[--color-text] font-medium">
                                                                {interview.position || 'לא צוין'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-3 font-medium text-[--color-secondary-text]">דירוג:</td>
                                                            <td className="py-2 px-3">
                                                                {interview.rating ? renderStars(interview.rating) : 'לא דורג'}
                                                            </td>
                                                        </tr>
                                                        {interview.description && (
                                                            <tr>
                                                                <td className="py-2 px-3 font-medium text-[--color-secondary-text]">תיאור:</td>
                                                                <td className="py-2 px-3">
                                                                    <span
                                                                        onClick={() => openDescriptionModal(interview.description!)}
                                                                        className="text-[--color-text] font-medium cursor-pointer hover:underline transition-colors duration-200"
                                                                    >
                                                                        לחץ לצפייה בתיאור
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </CardSimple>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-[--color-secondary-text]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-[--color-text] mb-2">
                            {numberOfInterviews === 0 ? 'אין ראיונות במערכת' : 'לא נמצאו ראיונות מתאימים'}
                        </h3>
                        <p className="text-[--color-secondary-text]">
                            {numberOfInterviews === 0 ? 'לא נמצאו ראיונות במערכת כרגע.' : 'נסה לשנות את הסינון כדי לראות תוצאות נוספות.'}
                        </p>
                    </div>
                )}
            </div>
            {/* פופאפ לתיאור */}
            {selectedDescription && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-[--color-text]">תיאור הראיון</h3>
                            <button
                                onClick={closeDescriptionModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <p className="text-[--color-text] leading-relaxed whitespace-pre-wrap">
                                {selectedDescription}
                            </p>
                        </div>
                        <div className="flex justify-end p-6 border-t border-gray-200">
                            <button
                                onClick={closeDescriptionModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                            >
                                סגור
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
