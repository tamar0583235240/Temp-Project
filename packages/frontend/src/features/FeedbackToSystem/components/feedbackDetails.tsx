import { useState } from "react";
import { FeedbackToSystem, treatment_status } from "../types/FeedbackToSystem";
import React from "react";
import { Button } from "../../../shared/ui/button";
import { CardSimple } from "../../../shared/ui/card";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Heading2, Paragraph } from "../../../shared/ui/typography";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { SummaryBox } from "../../../shared/ui/SummaryBox";
import { ProgressBar } from "../../../shared/ui/ProgressBar";
import {
    FaTimes,
    FaStar,
    FaCalendarAlt,
    FaUser,
    FaFileAlt,
    FaEye,
    FaDownload,
    FaCheckCircle,
    FaClock,
    FaExclamationCircle
} from "react-icons/fa";

export const FeedbackDetails = ({ feedback, onClose }: { feedback: FeedbackToSystem; onClose: Function }) => {
    const getStatusIcon = (status: treatment_status) => {
        switch (status) {
            case treatment_status.Treated:
                return <FaCheckCircle className="text-green-500" />;
            case treatment_status.InTreatment:
                return <FaClock className="text-yellow-500" />;
            default:
                return <FaExclamationCircle className="text-blue-500" />;
        }
    };

    const getStatusText = (status: treatment_status) => {
        switch (status) {
            case treatment_status.Treated:
                return "טופל";
            case treatment_status.InTreatment:
                return "בטיפול";
            default:
                return "חדש";
        }
    };

    const renderSectionTitle = (title: string) => (
        <h3 className="text-lg font-semibold text-text-main border-b border-border pb-2">{title}</h3>
    );

    const renderRatingItem = (label: string, value: number) => (
        <div className="space-y-1">
            <label className="text-sm font-medium text-text-main">{label}</label>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className={`text-xl ${star <= value ? "text-yellow-500" : "text-gray-300"}`} />
                ))}
                <span className="text-sm text-text-secondary">({value}/5)</span>
            </div>
        </div>
    );

    const renderTextBox = (label: string, value?: string | null) => {
        if (!value) return null;
        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main">{label}</label>
                <div className="bg-gray-50 border border-border rounded-md px-3 py-2 text-sm whitespace-pre-wrap text-text-secondary">
                    {value}
                </div>
            </div>
        );
    };

    const handleFileView = () => {
        if (feedback.file_upload_path) {
            const fileUrl = `/Screenshots/${feedback.file_upload_path}`;
            window.open(fileUrl, '_blank', 'noopener,noreferrer');
        }
    };




    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
                <CardSimple className="h-full flex flex-col p-0">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-border">
                        <div className="flex items-center gap-3">
                            <IconWrapper color="primary-dark" size="sm">
                                <FaEye />
                            </IconWrapper>
                            <Heading2 className="!text-xl !font-bold !m-0">פרטי פידבק</Heading2>
                            <span className="ml-3 text-sm rounded-full px-3 py-1 bg-primary-dark/10 text-primary-dark font-medium">
                                {getStatusIcon(feedback.treatment_status)} {getStatusText(feedback.treatment_status)}
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => onClose()}>
                            <FaTimes />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-10">
                            {/* דירוגים */}
                            <div className="space-y-6">
                                {renderSectionTitle("דירוגים")}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderRatingItem("חוויית שימוש כללית", feedback.general_experience_rating)}
                                    {renderRatingItem("רלוונטיות התוכן", feedback.relevance_rating)}
                                    {renderRatingItem("איכות ההסברים", feedback.tips_quality_rating)}
                                    {renderRatingItem("שימושיות ניתוח ה-AI", feedback.ai_analysis_usefulness_rating)}
                                    {renderRatingItem("שמישות התוכן", feedback.content_usability_rating)}
                                </div>
                            </div>

                            {/* טקסטים */}
                            <div className="space-y-6">
                                {renderSectionTitle("משובים וחוות דעת")}
                                {renderTextBox("מה אהבת במיוחד במערכת?", feedback.liked_most)}
                                {renderTextBox("הצעות לשיפור", feedback.suggestion_for_improvement)}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderTextBox("נושא סימולציה נוסף", feedback.extra_simulation_topic)}
                                    {renderTextBox("סוג תוכן חסר", feedback.missing_content_type)}
                                </div>
                                {renderTextBox("איך המערכת עזרה ללימוד עצמי?", feedback.self_learning)}
                                {renderTextBox("איך המערכת תרמה לביטחון שלך?", feedback.confidence_contribution)}
                                {renderTextBox("רעיון לפיצ'ר חדש", feedback.feature_idea)}
                                {renderTextBox("איך היית מתאר את המערכת לחבר?", feedback.system_description_to_friend)}
                            </div>

                            {/* קובץ */}
                            {feedback.file_upload_path && (
                                <div className="space-y-4">
                                    {renderSectionTitle("קובץ מצורף")}
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                        <FaFileAlt className="mx-auto text-2xl text-gray-400 mb-2" />
                                        <p className="text-sm font-medium text-text-main mb-2">
                                            {feedback.file_upload_path.split('/').pop()}
                                        </p>
                                        <Button onClick={handleFileView} variant="outline" size="sm">
                                            <FaEye className="mr-2" />
                                            צפייה בקובץ
                                        </Button>
                                </div>
                                </div>
                            )}
                    </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-border bg-gray-50">
                <Button variant="primary-dark" onClick={() => onClose()}>
                    סגור
                </Button>
            </div>
        </CardSimple>
            </div >
        </div >
    );
};