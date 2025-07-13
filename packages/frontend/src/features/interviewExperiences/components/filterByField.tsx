import { useState, useEffect, useMemo } from "react";
import { FaTimes, FaFilter } from 'react-icons/fa';

type FilterState = {
    companyName: string;
    position: string;
    rating: string;
    hasReports: string;
};

type FilterSidebarProps = {
    allInterview: any[];
    contentReports: any[];
    onFilteredResults: (filteredInterviews: any[]) => void;
    isOpen: boolean;
    onClose: () => void;
};

export const FilterByField: React.FC<FilterSidebarProps> = ({
    allInterview,
    contentReports,
    onFilteredResults,
    isOpen,
    onClose
}) => {
    const [filters, setFilters] = useState<FilterState>({
        companyName: '',
        position: '',
        rating: '',
        hasReports: ''
    });

    const hasContentReports = (experienceId: string) => {
        return contentReports && contentReports.some(r => r.experience_id === experienceId);
    };

    const getFilteredInterviews = useMemo(() => {
        if (!allInterview) return [];

        let result = [...allInterview];

        if (filters.companyName) {
            result = result.filter(interview =>
                interview.company_name === filters.companyName
            );
        }

        if (filters.position) {
            result = result.filter(interview =>
                interview.position === filters.position
            );
        }

        if (filters.rating) {
            const ratingValue = parseInt(filters.rating);
            result = result.filter(interview => interview.rating === ratingValue);
        }

        if (filters.hasReports) {
            if (filters.hasReports === 'with-reports') {
                result = result.filter(interview => hasContentReports(interview.id!));
            } else if (filters.hasReports === 'without-reports') {
                result = result.filter(interview => !hasContentReports(interview.id!));
            }
        }

        return result;
    }, [allInterview, contentReports, filters]);

    useEffect(() => {
        onFilteredResults(getFilteredInterviews);
    }, [getFilteredInterviews, onFilteredResults]);

    const uniqueCompanies = useMemo(() => {
        if (!allInterview) return [];
        const companies = allInterview
            .map(interview => interview.company_name)
            .filter(Boolean)
            .filter((company, index, arr) => arr.indexOf(company) === index);
        return companies.sort();
    }, [allInterview]);

    const uniquePositions = useMemo(() => {
        if (!allInterview) return [];
        const positions = allInterview
            .map(interview => interview.position)
            .filter(Boolean)
            .filter((position, index, arr) => arr.indexOf(position) === index);
        return positions.sort();
    }, [allInterview]);

    const handleFilterChange = (filterName: keyof FilterState, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            companyName: '',
            position: '',
            rating: '',
            hasReports: ''
        });
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

    return (
        <>
            {/* רקע כהה */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* חלונית הסינון */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`} dir="rtl">

                {/* כותרת מעוצבת */}
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <FaFilter className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">סינון ראיונות</h3>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* תוכן הסינון */}
                <div className="p-6 space-y-6 overflow-y-auto h-full pb-32">

                    {/* סינון לפי חברה */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            שם החברה
                        </label>
                        <select
                            value={filters.companyName}
                            onChange={(e) => handleFilterChange('companyName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
                        >
                            <option value="">כל החברות</option>
                            {uniqueCompanies.map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                        </select>
                    </div>

                    {/* סינון לפי תפקיד */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            תפקיד
                        </label>
                        <select
                            value={filters.position}
                            onChange={(e) => handleFilterChange('position', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
                        >
                            <option value="">כל התפקידים</option>
                            {uniquePositions.map(position => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </select>
                    </div>

                    {/* סינון לפי דירוג */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            דירוג
                        </label>
                        <select
                            value={filters.rating}
                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
                        >
                            <option value="">כל הדירוגים</option>
                            <option value="1">⭐ 1 כוכב</option>
                            <option value="2">⭐⭐ 2 כוכבים</option>
                            <option value="3">⭐⭐⭐ 3 כוכבים</option>
                            <option value="4">⭐⭐⭐⭐ 4 כוכבים</option>
                            <option value="5">⭐⭐⭐⭐⭐ 5 כוכבים</option>
                        </select>
                    </div>

                    {/* סינון לפי דיווחים */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            דיווחים על תוכן
                        </label>
                        <select
                            value={filters.hasReports}
                            onChange={(e) => handleFilterChange('hasReports', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
                        >
                            <option value="">הכל</option>
                            <option value="with-reports">🚨 עם דיווחים</option>
                            <option value="without-reports">✅ ללא דיווחים</option>
                        </select>
                    </div>

                </div>

                {/* כפתור איפוס בתחתית */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 shadow-lg">
                    <button
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                        className={`w-full px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${hasActiveFilters
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {hasActiveFilters ? ' איפוס סינון' : 'אין סינון פעיל'}
                    </button>
                </div>
            </div>
        </>
    );
};
