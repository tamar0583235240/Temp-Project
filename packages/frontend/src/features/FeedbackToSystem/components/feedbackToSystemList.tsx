import { useSelector } from "react-redux";
import { RootState } from '../../../shared/store/store';
import { useGetFeedbackToSystemByUserIdQuery } from "../services/feedbackToSystemApi";
import { Button } from "../../../shared/ui/button";
import { CardSimple } from "../../../shared/ui/card";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Grid } from "../../../shared/ui/grid";
import { Heading1, Paragraph } from "../../../shared/ui/typography";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { SummaryBox } from "../../../shared/ui/SummaryBox";
import * as React from "react";
import { FeedbackToSystem, treatment_status } from "../types/FeedbackToSystem";
import { useState } from 'react';
import { FeedbackDetails } from "./feedbackDetails";
import { UpdateFeedbackToSystem } from "./updateFeedbackToSystem";
import { set } from "react-hook-form";
import { DeleteFeedbackToSystem } from "./deleteFeedbackToSystem";

// אייקונים
const MessageIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const FeedbackToSystemList: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.id ?? '';
    const { data, error, isLoading } = useGetFeedbackToSystemByUserIdQuery(userId);
    const [selectedFeedback, setSelectedFeedback] = useState<FeedbackToSystem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false)
    const [editClick, setEditClick] = useState(false)
    console.log(selectedFeedback);


    const handleAddFeedback = () => {
        console.log('Navigate to add feedback');
    };

    if (isLoading) {
        return (
            <GridContainer maxWidth="xl" mt="mt-6">
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mb-4"></div>
                    <Paragraph className="text-center">טוען פידבקים למערכת...</Paragraph>
                </div>
            </GridContainer>
        );
    }

    if (error || !data) {
        return (
            <GridContainer maxWidth="xl" mt="mt-6">
                <CardSimple className="text-center py-12 border-red-200 bg-red-50">
                    <div className="text-red-600">
                        <IconWrapper color="danger" size="lg" className="mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </IconWrapper>
                        <Paragraph className="text-red-700 font-medium">שגיאה בטעינת הפידבקים</Paragraph>
                        <Paragraph className="text-red-600 text-sm mt-2">אנא נסה שוב מאוחר יותר</Paragraph>
                    </div>
                </CardSimple>
            </GridContainer>
        );
    }

    const handleFeedbackDetails = (feedbackId: string) => {
        const feedback = data.find(f => f.id === feedbackId);
        if (feedback) {
            setSelectedFeedback(feedback);
            setIsModalOpen(true);
        }
    };



    const sortedFeedbacks = [...data].sort((a, b) => {
        const numA = parseInt(a.id.split('-').pop() || '0', 10);
        const numB = parseInt(b.id.split('-').pop() || '0', 10);
        return numA - numB;
    });

    return (
        <GridContainer maxWidth="xl" mt="mt-6" mb="mb-8">
            <div className="space-y-8">
                {/* כותרת ראשית */}
                <div className="text-center space-y-4">
                    <IconWrapper color="primary-dark" size="lg" className="mx-auto">
                        <MessageIcon />
                    </IconWrapper>
                    <Heading1 className="text-2xl md:text-3xl">נשמח לשמוע ממך!</Heading1>
                    <Paragraph className="text-lg max-w-3xl mx-auto">
                        המשוב שלך חשוב לנו – עזרי לנו לשפר את המערכת ולהתאים אותה לצרכים שלך ושל משתמשות נוספות
                    </Paragraph>
                </div>

                {/* כפתור הוספת פידבק */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleAddFeedback}
                        variant="primary-dark"
                        size="lg"
                        icon={<PlusIcon />}
                        iconPosition="right"
                        className="shadow-lg hover:shadow-xl transition-shadow"
                    >
                        להוספת פידבק חדש
                    </Button>
                </div>

                {/* סיכום סטטיסטיקות */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryBox
                        title="סך הכל פידבקים"
                        value={data.length}
                        description="פידבקים ששלחת למערכת"
                        icon={<MessageIcon />}
                        iconColor="primary-dark"
                    />
                    <SummaryBox
                        title="פידבקים פעילים"
                        value={data.filter(f => f.treatment_status !== treatment_status.Treated).length}
                        description="פידבקים שעדיין בטיפול"
                        icon={<ClockIcon />}
                        iconColor="accent"
                    />
                    <SummaryBox
                        title="פידבקים שטופלו"
                        value={data.filter(f => f.treatment_status === treatment_status.Treated).length}
                        description="פידבקים שקיבלו מענה"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        }
                        iconColor="success"
                    />
                </div>

                {/* רשימת הפידבקים */}
                <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">הסטוריית הפידבקים שלי</h2>
                        <Paragraph className="text-sm">
                            כאן תוכלי לראות את כל הפידבקים ששלחת למערכת ולעקוב אחר הסטטוס שלהם
                        </Paragraph>
                    </div>
                    {data.length === 0 ? (
                        <CardSimple className="text-center py-16 bg-gray-50 border-dashed border-2 border-gray-200">
                            <IconWrapper color="muted" size="lg" className="mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </IconWrapper>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">עדיין לא שלחת פידבקים</h3>
                            <Paragraph className="text-gray-600 mb-6">
                                זה הזמן לשתף אותנו במחשבות שלך על המערכת
                            </Paragraph>
                            <Button
                                onClick={handleAddFeedback}
                                variant="outline"
                                size="md"
                                icon={<PlusIcon />}
                                iconPosition="right"
                            >
                                שלחי פידבק ראשון
                            </Button>
                        </CardSimple>
                    ) : (          
                        <Grid cols={data.length === 1 ? 1 : data.length === 2 ? 2 : 3}>
                            {sortedFeedbacks.map((feedback) => (
                                <CardSimple
                                    key={feedback.id}
                                    className="hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        {/* שורה עליונה - תאריך שמאל, כפתור פרטים ימין */}
                                        <div className="flex justify-between items-center">
                                            {feedback.createdat && (
                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                    <ClockIcon />
                                                    <span>{new Date(feedback.createdat).toLocaleDateString("he-IL")}</span>
                                                </div>
                                            )}
                                            <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleFeedbackDetails(feedback.id)}>
                                                פרטים
                                            </Button>
                                        </div>

                                        {/* תוכן הפידבק */}
                                        <div className="flex-1">
                                            {/* כאן אפשר להוסיף תוכן נוסף של הפידבק */}
                                        </div>

                                        {/* שורה תחתונה - סטטוס שמאל, כפתורי עריכה ומחיקה ימין */}
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-medium ${feedback.treatment_status === treatment_status.Treated
                                                    ? "bg-green-100 text-green-800 border border-green-200"
                                                    : feedback.treatment_status === treatment_status.InTreatment
                                                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                        : "bg-blue-100 text-blue-800 border border-blue-200"
                                                    }`}
                                            >
                                                {feedback.treatment_status === treatment_status.Treated
                                                    ? "✓ טופל"
                                                    : feedback.treatment_status === treatment_status.InTreatment
                                                        ? "⏳ בטיפול"
                                                        : "🆕 חדש"}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                {/* עריכה */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 flex items-center gap-1"
                                                    onClick={() => {
                                                        setEditClick(true);
                                                        setSelectedFeedback(feedback);
                                                    }}
                                                    icon={
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    }
                                                    iconPosition="left"
                                                >
                                                </Button>
                                                {/* מחיקה */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
                                                    onClick={() => { setDeleteClick(true); setSelectedFeedback(feedback) }}
                                                    icon={
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    }
                                                    iconPosition="left"
                                                >
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardSimple>
                            ))}
                        </Grid>
                    )}
                </div>
                {isModalOpen && selectedFeedback && (
                    <FeedbackDetails feedback={selectedFeedback} onClose={() => setIsModalOpen(false)} />
                )}
                {editClick && selectedFeedback &&
                    <UpdateFeedbackToSystem feedback={selectedFeedback} onClose={() => setEditClick(false)} />
                }
                {deleteClick && selectedFeedback &&
                    <DeleteFeedbackToSystem feedbackId={selectedFeedback.id} onClose={() => setDeleteClick(false)} />
                }
            </div>
        </GridContainer>
    )
};

