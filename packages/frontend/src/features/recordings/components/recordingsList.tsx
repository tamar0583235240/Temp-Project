import { TitleQuestions } from "./question";
import { RootState } from '../../../shared/store/store';
import { useSelector, useDispatch } from "react-redux";
import { Feedbackes } from "../../feedback/components/feedbackes";
import { useGetAnswersByIdUserQuery, useGetQuestionByIdQuery } from "../services/answerApi";
import { AiInsightsList } from "./AiInsightsList";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Heading1 } from "../../../shared/ui/typography";
import { CardSimple } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";
import { useEffect, useState } from "react";
import { Answer } from "../types/Answer";
import { FilteringComponents } from "./filteringComponents";
import { SearchComponents } from "./searchComponents";
import { SortComponents } from "./sortComponents";

type RecordingsListProps = {
    allowedRoles: string[];
}

export const RecordingsList: React.FC<RecordingsListProps> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    // שורה זו צריך לשנות לאחר שיש את הנתונים של המשתמש הנוכחי שנמצא כעת באתר
    const userId = user && user.id ? user.id.toString() : '00000000-0000-0000-0000-000000000004';
    const { data, error, isLoading } = useGetAnswersByIdUserQuery(userId);

    // סטייטים לאחזקת ה-inputs
    const [searchText, setSearchText] = useState('');
    const [filterCriteria, setFilterCriteria] = useState<{ dateFilter: string; questionName: string; feedbackCategory: string }>({
        dateFilter: 'all',
        questionName: '',
        feedbackCategory: '',
    });
    const [sortOption, setSortOption] = useState('latest');

    const [displayedAnswers, setDisplayedAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        if (!data) return;

        let results = [...data];

        // סינון לפי חיפוש
        if (searchText.trim() !== '') {
            results = results.filter(answer =>
                answer.answer_file_name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // סינון לפי שאלה + פידבק (אבל עדיין לא לפי תאריך)
        results = results.filter(answer => {
            const questionPass =
                filterCriteria.questionName === '' || answer.question_id === filterCriteria.questionName;
            const feedbackPass =
                filterCriteria.feedbackCategory === '' ||
                (filterCriteria.feedbackCategory === 'none' && answer.amount_feedbacks === 0) ||
                (filterCriteria.feedbackCategory === 'low' && answer.amount_feedbacks >= 1 && answer.amount_feedbacks <= 3) ||
                (filterCriteria.feedbackCategory === 'high' && answer.amount_feedbacks >= 4);
            return questionPass && feedbackPass;
        });

        // סינון לפי תאריך
        if (filterCriteria.dateFilter === 'latest' && results.length > 0) {
            const latest = results.reduce((a, b) =>
                new Date(b.submitted_at) > new Date(a.submitted_at) ? b : a
            );
            results = [latest]; // נחזיר רק את ההקלטה הכי חדשה מהסינון הקיים
        } else if (filterCriteria.dateFilter === 'lastWeek') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            results = results.filter(answer => new Date(answer.submitted_at) >= oneWeekAgo);
        } else if (filterCriteria.dateFilter === 'lastMonth') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            results = results.filter(answer => new Date(answer.submitted_at) >= thirtyDaysAgo);
        }

        // מיון
        results.sort((a, b) => {
            switch (sortOption) {
                case 'latest':
                    return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
                case 'oldest':
                    return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
                case 'mostFeedbacks':
                    return b.amount_feedbacks - a.amount_feedbacks;
                case 'leastFeedbacks':
                    return a.amount_feedbacks - b.amount_feedbacks;
                default:
                    return 0;
            }
        });

        setDisplayedAnswers(results);
    }, [data, searchText, filterCriteria, sortOption]);

    if (isLoading)
        return (
            <GridContainer className="text-center" dir="rtl">
                <Heading1>Loading...</Heading1>
            </GridContainer>
        );

    if (error || !data)
        return (
            <GridContainer className="text-center" dir="rtl">
                <Heading1>Error loading recordings</Heading1>
            </GridContainer>
        );

    return (  
        <GridContainer maxWidth="lg" className="text-center" dir="rtl" padding="px-2 sm:px-4 lg:px-6">
             <FilteringComponents
                filterCriteria={filterCriteria}
                setFilterCriteria={setFilterCriteria}
                originalAnswers={data ?? []}
            />

            <Heading1 className="mb-8">ההקלטות שלי</Heading1>
            
            <div className="top-controls">
                <SearchComponents
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
            </div>
            
            <SortComponents
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
            
            <div className="space-y-4">
                {displayedAnswers.map((recording, index) => (
                    <CardSimple 
                        key={recording.id} 
                        className="w-full max-w-2xl mx-auto overflow-hidden hover:shadow-lg transition-shadow
                                   xl:max-w-3xl xl:w-4/5
                                   lg:max-w-2xl lg:w-4/5  
                                   md:max-w-xl md:w-4/5
                                   sm:max-w-lg sm:w-4/5
                                   max-sm:w-11/12 max-sm:max-w-sm"
                    >
                        <div className="bg-primary-dark text-white py-3 px-4 -m-4 mb-4 flex flex-row justify-between items-center
                                       xl:px-16 xl:py-3.5
                                       lg:px-12 lg:py-3
                                       md:px-8 md:py-3 md:flex-row
                                       sm:px-6 sm:py-3 sm:flex-col sm:gap-3 sm:text-center
                                       max-sm:px-4 max-sm:py-2.5 max-sm:flex-col max-sm:gap-2 max-sm:text-center">
                            
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold
                                               lg:text-xl
                                               md:text-lg
                                               sm:text-base
                                               max-sm:text-sm">
                                    מענה לשאלה:
                                </span>
                                <div className="text-lg font-bold
                                               lg:text-xl
                                               md:text-lg
                                               sm:text-base
                                               max-sm:text-sm">
                                    <TitleQuestions data={recording.question_id} />
                                </div>
                            </div>
                            
                            <div>
                                <a href={recording.file_url} download>
                                    <Button
                                        variant="transparent"
                                        size="sm"
                                        className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all
                                                  sm:text-xs sm:px-3 sm:py-1.5
                                                  max-sm:text-xs max-sm:px-2 max-sm:py-1"
                                        icon={
                                            <svg className="w-4 h-4 sm:w-3 sm:h-3 max-sm:w-3 max-sm:h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor" />
                                                <path d="M5 20V18H19V20H5Z" fill="currentColor" />
                                            </svg>
                                        }
                                        iconPosition="right"
                                    >
                                        הורד הקלטה
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 items-center py-2 px-4 border-t border-muted
                                       xl:px-16 xl:py-3
                                       lg:px-12 lg:py-2.5
                                       md:px-8 md:py-2
                                       sm:px-6 sm:py-2
                                       max-sm:px-4 max-sm:py-2">
                            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-text-secondary font-medium">תאריך הגשה:</span>
                                <span className="text-sm text-text-main font-semibold bg-muted px-2 py-1 rounded-md">
                                    {new Date(recording.submitted_at).toLocaleDateString('he-IL')}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center items-center py-2 px-4 border-t border-muted
                                       xl:px-16 xl:py-3
                                       lg:px-12 lg:py-2.5
                                       md:px-8 md:py-2
                                       sm:px-6 sm:py-2
                                       max-sm:px-4 max-sm:py-2">
                            <audio 
                                className="w-full max-w-2xl h-8 outline-none
                                          xl:w-4/5
                                          lg:w-11/12
                                          md:w-full
                                          sm:w-full sm:h-8
                                          max-sm:w-full max-sm:h-8" 
                                controls
                            >
                                <source src={recording.file_url} type="audio/mpeg" />
                                הדפדפן שלך לא תומך בנגן האודיو
                            </audio>
                        </div>

                        <AiInsightsList answerId={recording.id} />
                        <Feedbackes props={{ sharedRecordingId: recording.id, usersList: [] }} />
                    </CardSimple>
                ))}
            </div>
        </GridContainer>
    );
}
