import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../shared/store/store';
import { useGetAnswersByIdUserQuery } from "../services/answerApi";
import { TitleQuestions } from "./question";
import { Feedbackes } from "../../feedback/components/feedbackes";
import { AiInsightsList } from "./AiInsightsList";
import { SortComponents } from "./sortComponents";
import { FilteringComponents } from "./filteringComponents";
import { SearchComponents } from "./searchComponents";
import { Answer } from "../types/Answer";
import ShareDialog from "../../shared-recordings/components/ShareDialog";
import ShareButton from "../../shared-recordings/components/ShareButton";
import './RecordingsList.css';

const RecordingsList = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id?.toString() ?? '00000000-0000-0000-0000-000000000004';
  const { data, error, isLoading } = useGetAnswersByIdUserQuery(userId);

  const [searchText, setSearchText] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    dateFilter: 'all',
    questionName: '',
    feedbackCategory: '',
  });
  const [sortOption, setSortOption] = useState('latest');
  const [displayedAnswers, setDisplayedAnswers] = useState<Answer[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;

    let results = [...data];

    if (searchText.trim() !== '') {
      results = results.filter(answer =>
        answer.answer_file_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // results = results.filter(answer => {
    //   const questionPass =
    //     filterCriteria.questionName === '' || answer.question_id === filterCriteria.questionName;
    //   const feedbackPass =
    //     filterCriteria.feedbackCategory === '' ||
    //     (filterCriteria.feedbackCategory === 'none' && answer.amount_feedbacks === 0) ||
    //     (filterCriteria.feedbackCategory === 'low' && answer.amount_feedbacks >= 1 && answer.amount_feedbacks <= 3) ||
    //     (filterCriteria.feedbackCategory === 'high' && answer.amount_feedbacks >= 4);
    //   return questionPass && feedbackPass;
    // });

    if (filterCriteria.dateFilter === 'latest' && results.length > 0) {
      const latest = results.reduce((a, b) =>
        new Date(b.submitted_at) > new Date(a.submitted_at) ? b : a
      );
      results = [latest];
    } else if (filterCriteria.dateFilter === 'lastWeek') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      results = results.filter(answer => new Date(answer.submitted_at) >= oneWeekAgo);
    } else if (filterCriteria.dateFilter === 'lastMonth') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      results = results.filter(answer => new Date(answer.submitted_at) >= thirtyDaysAgo);
    }

    results.sort((a, b) => {
      switch (sortOption) {
        case 'latest':
          return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
        case 'oldest':
          return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
        // case 'mostFeedbacks':
        //   return b.amount_feedbacks - a.amount_feedbacks;
        // case 'leastFeedbacks':
        //   return a.amount_feedbacks - b.amount_feedbacks;
        default:
          return 0;
      }
    });

    setDisplayedAnswers(results);
  }, [data, searchText, filterCriteria, sortOption]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading recordings</div>;

  return (
    <>
      <div className="page-layout">
        <FilteringComponents
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          originalAnswers={data ?? []}
        />

        <div className="top-controls">
          <SearchComponents
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <SortComponents
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>

        <div className="recordings-container">
          <h2 className="recordings-title">ההקלטות שלי</h2>
          {displayedAnswers.map((recording) => (
            <div key={recording.id} className="recording-card">
              <div className="card-header buttons-wrapper">
                <div className="answer-title-container">
                  <span className="answer-prefix">מענה לשאלה: </span>
                  <TitleQuestions data={recording.question_id} />
                </div>

                <a href={recording.file_url} download>
                  <button className="download-button">
                    <svg className="download-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor" />
                      <path d="M5 20V18H19V20H5Z" fill="currentColor" />
                    </svg>
                    הורדה
                  </button>
                </a>

                <ShareButton
                  setIsDialogOpen={() => {
                    setSelectedRecordingId(recording.id);
                    setIsDialogOpen(true);
                  }}
                />
              </div>

              <div className="recording-header">
                <div className="submission-date">
                  <span className="date-label">תאריך הגשה:</span>
                  <span className="date-value">
                    {new Date(recording.submitted_at).toLocaleDateString('he-IL')}
                  </span>
                </div>
              </div>

              <div className="audio-section">
                <audio className="audio-player" controls>
                  <source src={recording.file_url} type="audio/mpeg" />
                  הדפדפן שלך לא תומך בנגן האודיו
                </audio>
              </div>

              <AiInsightsList answerId={recording.id} />
              <Feedbackes props={{ sharedRecordingId: recording.id, usersList: [] }} />
            </div>
          ))}
        </div>
      </div>

      {selectedRecordingId && (
        <ShareDialog
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedRecordingId(null);
          }}
          userId={userId}
          recordingId={selectedRecordingId}
        />
      )}
    </>
  );
};

export default RecordingsList;