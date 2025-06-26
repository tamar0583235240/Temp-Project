import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';


import { answerQuestion, nextQuestion, resetQuestion } from '../store/simulationSlice';
import { RootState } from '../../../shared/store/store';
import { Bot, RotateCcw, Sparkles } from 'lucide-react';

const Buttons = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { questions, currentIndex } = useAppSelector((state: RootState) => state.simulation);
  const [showEnd, setShowEnd] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = questions.filter((q) => q.answered).length;
  

  const handleTextChange = (value: string) => {
    dispatch(answerQuestion({ index: currentIndex, answer: value }));
  };
  const handleReset = () => {
    dispatch(resetQuestion(currentIndex));
  };
  // const handleSubmit = () => {
  //   handleTextChange(currentQuestion.answer ?? "");
  //   navigate("/summary");
  // };


  return (

    
  <div className="flex flex-col items-center gap-4 mt-4">
    {/* <div className="flex gap-4 mt-2 mb-2 w-full">
          <button
            className="w-1/2 bg-[--color-primary] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[--color-primary-dark] transition text-lg flex items-center justify-center"
            onClick={() => handleTextChange(currentQuestion.answer ?? "")}
          >
            התחל הקלטה
          </button>
          <button
            className="w-1/2 border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold hover:bg-[--color-background] transition text-lg flex items-center justify-center gap-2"
          >
            העלה קובץ
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </button>
        </div> */}
          <div className="flex gap-2">
      <button
        className="bg-danger text-white px-6 py-2 rounded-lg font-semibold hover:bg-danger/90 transition"
        onClick={handleReset}
      >
        איפוס תשובה
        <RotateCcw size={20} />
      </button>
      <button
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
                onClick={() => {
                  handleTextChange(currentQuestion.answer ?? "");
                  setTimeout(() => dispatch(nextQuestion()), 300);
                }}
              >
                ניתוח AI
                <Sparkles/>
                {/* <Bot/> */}
              </button>
          </div>

    {answeredCount == questions.length && ( 
      <button
        className="relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[--color-primary] text-white font-bold text-xl shadow-md hover:bg-[--color-primary-dark] transition-all duration-200 border border-[--color-border] mt-6"
        onClick={() => setShowEnd(true)}
        style={{ minWidth: 220 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Heroicon: CheckBadge */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        סיום השאלון
      </button>
    )}
   
    {showEnd && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="relative bg-[--color-surface] rounded-2xl p-8 shadow-2xl w-full max-w-md text-right border border-[--color-border] animate-fade-in">
          <button
            className="absolute top-4 left-4 text-[--color-text] hover:text-[--color-primary-dark] text-2xl"
            onClick={() => setShowEnd(false)}
            aria-label="סגור"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[--color-primary] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414M17.657 17.657l-1.414-1.414M6.343 6.343L4.929 4.929" />
            </svg>
            <p className="text-2xl font-bold mb-2 text-[--color-primary]">ברכות!</p>
            <p className="text-base font-semibold mb-6 text-[--color-text]">סיימת בהצלחה את השאלון</p>
            <div className="flex gap-3 w-full justify-center">
              <button
                className="flex items-center gap-2 bg-[--color-primary] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[--color-primary-dark] transition"
                onClick={() => navigate('/certificate')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
                הנפקת תעודה
              </button>
              <button
                className="flex items-center gap-2 border border-[--color-border] bg-white text-[--color-text] px-5 py-2 rounded-lg font-semibold shadow hover:bg-[--color-background] transition"
                onClick={() => navigate('/dashboard')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-[--color-primary]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
                דשבורד
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Buttons;