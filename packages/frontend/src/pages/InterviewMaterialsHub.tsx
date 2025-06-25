import React, { useEffect, useState, useCallback } from 'react';
import SearchBox from '../features/interview-materials-hub/components/SearchBox';
import { interview_materials_subType } from '../features/interview-materials-hub/types/interview_materials_subType';
import { useGetAllMaterialsQuery, useSearchMaterialsQuery } from '../features/interview-materials-hub/store/interviewMaterialSubApi'

const DEBOUNCE_DELAY = 500;

const InterviewMaterialsHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<interview_materials_subType[]>([]);
  const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { data: allMaterials, isLoading: isLoadingAll, isSuccess: isSuccessAll } = useGetAllMaterialsQuery();
  const { data: searchResults, isLoading: isLoadingSearch, isSuccess: isSuccessSearch, } = useSearchMaterialsQuery(debouncedQuery, {
    skip: !debouncedQuery, 
    });

   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery && isSuccessAll && allMaterials) {
      setResults(allMaterials);
    } else if (debouncedQuery && isSuccessSearch && searchResults) {
      setResults(searchResults);
    }
  }, [debouncedQuery, isSuccessAll, allMaterials, isSuccessSearch, searchResults]);

  return (
    <div>
      <h1>🎯 חיפוש חומרי ריאיונות</h1>
      <SearchBox
        query={query}
        setQuery={setQuery}
        loading={isLoadingAll || isLoadingSearch}
        results={results}
        onSearch={(e) => {
          e.preventDefault();
          setDebouncedQuery(query.trim()); // חיפוש גם בלחיצה
        }}
      />
      {(isLoadingAll || isLoadingSearch) && <p>טוען...</p>}
      {!isLoadingAll && !isLoadingSearch && results.length === 0 && (
        <p>לא נמצאו תוצאות.</p>
      )}
    </div>
  );
};

export default InterviewMaterialsHub;
