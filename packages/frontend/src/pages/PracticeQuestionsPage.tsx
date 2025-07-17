import React, { useState } from "react";
import AddPracticeQuestionButton from "../features/practiceQuestions/components/AddPracticeQuestionButton";
import PracticeQuestions from "../features/practiceQuestions/components/practiceQuestions";
import FiltersBar from "../features/practiceQuestions/components/FiltersBar";
import { useGetTopicsQuery } from "../features/practiceQuestions/services/practiceQuestionsApi";

const PracticeQuestionsPage = () => {
  const { data: topics = [], isLoading: topicsLoading } = useGetTopicsQuery();
  
  const [filters, setFilters] = useState({
    topicId: "",
    difficulty: "",
    type: "",
    generatedByAi: false,
    search: "",
  });

  if (topicsLoading) return <div>טוען נושאים...</div>;

  return (
    <>
      <AddPracticeQuestionButton />
      <FiltersBar topics={topics} onChange={setFilters} initialFilters={filters} />
      <PracticeQuestions filters={filters} />
    </>
  );
};

export default PracticeQuestionsPage;
