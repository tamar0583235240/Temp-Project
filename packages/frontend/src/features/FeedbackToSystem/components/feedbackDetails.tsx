import { useState } from "react";
import { FeedbackToSystem, treatment_status } from "../types/FeedbackToSystem";
import React from "react";

export const FeedbackDetails= (props: { feedback: FeedbackToSystem,onClose:Function })  => {
    const {onClose,feedback}= props;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative">
                            <button
                                className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-xl"
                                onClick={() => onClose()}
                            >
                                ✕
                            </button>

                            <h3 className="text-2xl font-semibold mb-4 text-center">פרטי הפידבק</h3>

                            <div className="space-y-3 text-right text-sm">
                                <p><strong>תאריך שליחה:</strong> {feedback.createdat ? new Date(feedback.createdat).toLocaleString("he-IL") : "לא ידוע"}</p>
                                <p><strong>סטטוס טיפול:</strong> {
                                    feedback.treatment_status === treatment_status.Treated
                                        ? "✓ טופל"
                                        : feedback.treatment_status === treatment_status.InTreatment
                                            ? "⏳ בטיפול"
                                            : "🆕 חדש"
                                }</p>
                                <p><strong>חווית שימוש כללית:</strong> {feedback.general_experience_rating}/5</p>
                                <p><strong>מה אהבת במיוחד:</strong> {feedback.liked_most || "לא צויין"}</p>
                                <p><strong>הצעה לשיפור:</strong> {feedback.suggestion_for_improvement || "לא צויינה"}</p>
                                <p><strong>רלוונטיות התוכן:</strong> {feedback.relevance_rating}/5</p>
                                <p><strong>איכות ההסברים:</strong> {feedback.tips_quality_rating}/5</p>
                                <p><strong>עד כמה ניתוח ה-AI עזר:</strong> {feedback.ai_analysis_usefulness_rating}/5</p>
                                <p><strong>נושא סימולציה נוסף שהיית רוצה:</strong> {feedback.extra_simulation_topic || "לא צויין"}</p>
                                <p><strong>שימושיות התוכן:</strong> {feedback.content_usability_rating}/5</p>
                                <p><strong>איזה תוכן היה חסר לך:</strong> {feedback.missing_content_type || "לא צויין"}</p>
                                <p><strong>עד כמה למדת בעצמך מהמערכת:</strong> {feedback.self_learning || "לא צויין"}</p>
                                <p><strong>עד כמה המערכת תרמה לך לביטחון:</strong> {feedback.confidence_contribution || "לא צויין"}</p>
                                <p><strong>פיצ'ר שהיית רוצה:</strong> {feedback.feature_idea || "לא צויין"}</p>
                                <p><strong>איך תתארי את המערכת לחברה:</strong> {feedback.system_description_to_friend || "לא צויין"}</p>
                                <p><strong>קובץ שצורף:</strong> {feedback.file_upload_path ? <a href={feedback.file_upload_path} target="_blank" className="text-blue-600 underline">לחצי לפתיחה</a> : "לא צורף"}</p>
                                <p><strong>האם הפידבק אנונימי:</strong> {feedback.is_anonymous ? "כן" : "לא"}</p>
                            </div>
                        </div>
                    </div>
    )
};