import { useState } from "react";
import { createPortal } from "react-dom";
import { experienceThanks } from "../types/experienceThanks";
import { interviewExperiences } from "../types/interviewExperiences";
import { User } from "../../auth/types/types";
import { RootState } from '../../../shared/store/store';
import { useAddExperienceThanksMutation } from '../services/experienceThanksApi'
import { useSelector } from "react-redux";
import { useAddContentReportsMutation } from "../services/contentReportsApi";

export const InterviewExperienceView = (props: { interviewExperience: interviewExperiences, experienceThanks: experienceThanks[], users: User[] }) => {
    const { interviewExperience, experienceThanks } = props;
    const user = useSelector((state: RootState) => state.auth.user);
    const [addExperienceThanks] = useAddExperienceThanksMutation();
    const [addcontentReports] = useAddContentReportsMutation();

    const [openView, setOpenView] = useState(false);
    const [isThanks, setIsThanks] = useState(experienceThanks.find(thanks => thanks.user_id === user?.id) ? true : false);

    function addThunk() {
        let newThunk = {
            experience_id: interviewExperience.id,
            user_id: user ? user.id : '1',
            created_at: new Date(),
            id: '1'
        }
        addExperienceThanks(newThunk);
        setIsThanks(true);
    }

    function addReport(){
        let newReport = {
            id: '1',
            experience_id: interviewExperience.id,
            user_id: user ? user.id : '1',
            created_at: new Date()
        }
        addcontentReports(newReport);
    }

    function getUserNameById(userId: string): string {
        const user = props.users.find(user => user.id === userId);
        return user ? user.first_name + ' ' + user.last_name : 'Unknown User';
    }

    const modalContent = openView ? (
        <div 
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: '9999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                boxSizing: 'border-box'
            }}
            onClick={() => setOpenView(false)}
        >
            <div 
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '700px',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h2 style={{ 
                                margin: '0 0 8px 0', 
                                fontSize: '20px', 
                                fontWeight: '600',
                                color: '#111827'
                            }}>
                                חוויית ראיון ב{interviewExperience.company_name}
                            </h2>
                            <p style={{ 
                                margin: '0', 
                                color: '#6b7280',
                                fontSize: '14px'
                            }}>
                                {interviewExperience.position}
                            </p>
                        </div>
                        <button
                            onClick={() => setOpenView(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer',
                                color: '#6b7280',
                                padding: '4px',
                                lineHeight: '1'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{
                    flex: '1',
                    overflowY: 'auto',
                    padding: '20px'
                }}>
                    {/* משתמש */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        border: '1px solid #bbf7d0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>
                                {interviewExperience.anonymous ? "💁‍♂️" : "👤"}
                            </span>
                            <div>
                                <div style={{ fontWeight: '500', color: '#111827' }}>
                                    {interviewExperience.anonymous 
                                        ? "משתמשת אנונימית" 
                                        : getUserNameById(interviewExperience.user_id || '')
                                    }
                                </div>
                                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                    פורסם ב-{new Date(interviewExperience.created_at || '')?.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* תיאור */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ 
                            margin: '0 0 8px 0', 
                            fontSize: '16px', 
                            fontWeight: '600',
                            color: '#111827'
                        }}>
                            תיאור החוויה:
                        </h3>
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '6px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',
                            color: '#374151'
                        }}>
                            {interviewExperience.description}
                        </div>
                    </div>

                    {/* שאלות */}
                    {interviewExperience.questions && (
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ 
                                margin: '0 0 8px 0', 
                                fontSize: '16px', 
                                fontWeight: '600',
                                color: '#111827'
                            }}>
                                שאלות שנשאלו:
                            </h3>
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '6px',
                                lineHeight: '1.5',
                                whiteSpace: 'pre-wrap',
                                color: '#374151'
                            }}>
                                {interviewExperience.questions}
                            </div>
                        </div>
                    )}

                    {/* דירוג */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ 
                            margin: '0 0 8px 0', 
                            fontSize: '16px', 
                            fontWeight: '600',
                            color: '#111827'
                        }}>
                            רמת ההנאה:
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {[1,2,3,4,5].map(star => (
                                <span 
                                    key={star}
                                    style={{
                                        fontSize: '20px',
                                        color: star <= (interviewExperience.rating || 0) ? '#fbbf24' : '#d1d5db'
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                            <span style={{ marginRight: '8px', color: '#6b7280', fontSize: '14px' }}>
                                ({interviewExperience.rating || 0}/5)
                            </span>
                        </div>
                    </div>

                    {/* טיפים */}
                    {interviewExperience.tips && (
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ 
                                margin: '0 0 8px 0', 
                                fontSize: '16px', 
                                fontWeight: '600',
                                color: '#111827'
                            }}>
                                טיפים להצלחה:
                            </h3>
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#fffbeb',
                                borderRadius: '6px',
                                lineHeight: '1.5',
                                whiteSpace: 'pre-wrap',
                                color: '#374151',
                                border: '1px solid #fed7aa'
                            }}>
                                {interviewExperience.tips}
                            </div>
                        </div>
                    )}

                    {/* תוצאה */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ 
                            margin: '0 0 8px 0', 
                            fontSize: '16px', 
                            fontWeight: '600',
                            color: '#111827'
                        }}>
                            תוצאת הראיון:
                        </h3>
                        <div style={{
                            padding: '12px',
                            backgroundColor: interviewExperience.hired ? '#f0fdf4' : '#fef2f2',
                            borderRadius: '6px',
                            border: `1px solid ${interviewExperience.hired ? '#bbf7d0' : '#fecaca'}`,
                            color: interviewExperience.hired ? '#16a34a' : '#dc2626',
                            fontWeight: '500'
                        }}>
                            {interviewExperience.hired ? 'התקבלה לעבודה ✅' : 'לא התקבלה ❌'}
                        </div>
                    </div>

                    {/* תודות */}
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '6px',
                        textAlign: 'center',
                        border: '1px solid #bfdbfe'
                    }}>
                        <span style={{ fontWeight: '500', color: '#1e40af' }}>
                            ❤️ {experienceThanks.length} תודות
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '20px',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <button
                        onClick={addReport}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc2626',
                            cursor: 'pointer',
                            fontSize: '14px',
                            padding: '8px'
                        }}
                    >
                        🚩 דווח על תוכן לא הולם     
                    </button>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setOpenView(false)}
                            style={{
                                padding: '8px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                backgroundColor: '#ffffff',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            סגור
                        </button>
                        <button
                            onClick={addThunk}
                            disabled={isThanks}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '6px',
                                backgroundColor: isThanks ? '#9ca3af' : '#00B894',
                                color: '#ffffff',
                                cursor: isThanks ? 'not-allowed' : 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            {isThanks ? '❤️ תודה נשלחה' : '❤️ תודה'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button 
                onClick={() => setOpenView(true)}
                style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#374151'
                }}
            >
                👁️ הצג פרטים
            </button>
            {modalContent && createPortal(modalContent, document.body)}
        </>
    );
};
