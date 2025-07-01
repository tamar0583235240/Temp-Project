// import React, { useEffect, useState } from 'react';
// import SearchBox from '../features/interview-materials-hub/components/SearchBox';
// import { interview_materials_subType } from '../features/interview-materials-hub/types/interview_materials_subType';
// import { useGetAllMaterialsQuery, useSearchMaterialsQuery } from '../features/interview-materials-hub/store/interviewMaterialSubApi';
// import DownloadCard from '../features/interview-materials-hub/components/DownloadCard';

// const DEBOUNCE_DELAY = 500;

// const InterviewMaterialsHub: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<interview_materials_subType[]>([]);
//   const [debouncedQuery, setDebouncedQuery] = useState(query);
//   const [didSearch, setDidSearch] = useState(false);

//   const {
//     data: allMaterials,
//     isLoading: isLoadingAll,
//     isSuccess: isSuccessAll,
//   } = useGetAllMaterialsQuery();

//   const {
//     data: searchResults,
//     isLoading: isLoadingSearch,
//     isSuccess: isSuccessSearch,
//   } = useSearchMaterialsQuery(debouncedQuery, {
//     skip: !debouncedQuery,
//   });

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query.trim());
//     }, DEBOUNCE_DELAY);

//     return () => clearTimeout(handler);
//   }, [query]);

//   useEffect(() => {
//     if (debouncedQuery) {
//       setDidSearch(true);
//       if (isSuccessSearch && searchResults) {
//         setResults(searchResults);
//       }
//     } else {
//       if (!didSearch && isSuccessAll && allMaterials) {
//         setResults(allMaterials); // רק בטעינה ראשונה
//       } else {
//         setResults([]); // אם כבר בוצע חיפוש, אל תציג כלום
//       }
//     }
//   }, [
//     debouncedQuery,
//     isSuccessAll,
//     allMaterials,
//     isSuccessSearch,
//     searchResults,
//     didSearch,
//   ]);

//   return (
//     <div className="px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4">🎯 חיפוש חומרי ריאיונות</h1>
//       <SearchBox
//         query={query}
//         setQuery={setQuery}
//         loading={isLoadingAll || isLoadingSearch}
//         results={results}
//         onSearch={(e) => {
//           e.preventDefault();
//           setDebouncedQuery(query.trim());
//         }}
//       />
//       <DownloadCard />
//     </div>
//   );
// };

// export default InterviewMaterialsHub;


"use client"

import type React from "react"
import { useEffect, useState } from "react"
import SearchBox from "../features/interview-materials-hub/components/SearchBox"
import DownloadCard from "../features/interview-materials-hub/components/DownloadCard"
import type { interview_materials_subType } from "../features/interview-materials-hub/types/interview_materials_subType"
import {
  useGetAllMaterialsQuery,
  useSearchMaterialsQuery,
} from "../features/interview-materials-hub/store/interviewMaterialSubApi"

const DEBOUNCE_DELAY = 500

const InterviewMaterialsHub: React.FC = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<interview_materials_subType[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [didSearch, setDidSearch] = useState(false)

  const {
    data: allMaterials,
    isLoading: isLoadingAll,
    isSuccess: isSuccessAll,
    isError: isErrorAll,
  } = useGetAllMaterialsQuery()

  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    isSuccess: isSuccessSearch,
    isError: isErrorSearch,
  } = useSearchMaterialsQuery(debouncedQuery, {
    skip: !debouncedQuery,
  })

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim())
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(handler)
  }, [query])

  // Results logic
  useEffect(() => {
    if (debouncedQuery) {
      setDidSearch(true)
      if (isSuccessSearch && searchResults) {
        setResults(searchResults)
      }
    } else {
      if (!didSearch && isSuccessAll && allMaterials) {
        setResults(allMaterials) // רק בטעינה ראשונה
      } else {
        setResults([]) // אם כבר בוצע חיפוש, אל תציג כלום
      }
    }
  }, [debouncedQuery, isSuccessAll, allMaterials, isSuccessSearch, searchResults, didSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setDebouncedQuery(query.trim())
  }

  const isLoading = isLoadingAll || isLoadingSearch
  const isError = isErrorAll || isErrorSearch

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary/5 to-secondary/10" dir="rtl">
      <SearchBox query={query} setQuery={setQuery} onSearch={handleSearch} loading={isLoading} />

      <DownloadCard
        files={results}
        isLoading={isLoading}
        isError={isError}
        hasSearched={didSearch || (isSuccessAll && allMaterials?.length > 0)}
        didSearch={didSearch}
      />
    </div>
  )
}

export default InterviewMaterialsHub
