// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import SearchBox from "../features/interview-materials-hub/components/SearchBox"
// import DownloadCard from "../features/interview-materials-hub/components/DownloadCard"
// import type { interview_materials_subType } from "../features/interview-materials-hub/types/interview_materials_subType"
// import {
//   useGetAllMaterialsQuery,
//   useSearchMaterialsQuery,
// } from "../features/interview-materials-hub/store/interviewMaterialSubApi"

// const DEBOUNCE_DELAY = 500

// const InterviewMaterialsHub: React.FC = () => {
//   const [query, setQuery] = useState("")
//   const [results, setResults] = useState<interview_materials_subType[]>([])
//   const [debouncedQuery, setDebouncedQuery] = useState(query)
//   const [didSearch, setDidSearch] = useState(false)

//   const {
//     data: allMaterials,
//     isLoading: isLoadingAll,
//     isSuccess: isSuccessAll,
//     isError: isErrorAll,
//   } = useGetAllMaterialsQuery()

//   const {
//     data: searchResults,
//     isLoading: isLoadingSearch,
//     isSuccess: isSuccessSearch,
//     isError: isErrorSearch,
//   } = useSearchMaterialsQuery(debouncedQuery, {
//     skip: !debouncedQuery,
//   })

//   // Debounce logic
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query.trim())
//     }, DEBOUNCE_DELAY)

//     return () => clearTimeout(handler)
//   }, [query])

//   // Results logic
//   useEffect(() => {
//     if (debouncedQuery) {
//       setDidSearch(true)
//       if (isSuccessSearch && searchResults) {
//         setResults(searchResults)
//       }
//     } else {
//       if (!didSearch && isSuccessAll && allMaterials) {
//         setResults(allMaterials) // רק בטעינה ראשונה
//       } else {
//         setResults([]) // אם כבר בוצע חיפוש, אל תציג כלום
//       }
//     }
//   }, [debouncedQuery, isSuccessAll, allMaterials, isSuccessSearch, searchResults, didSearch])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     setDebouncedQuery(query.trim())
//   }

//   const isLoading = isLoadingAll || isLoadingSearch
//   const isError = isErrorAll || isErrorSearch

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary/5 to-secondary/10" dir="rtl">
//       <SearchBox query={query} setQuery={setQuery} onSearch={handleSearch} loading={isLoading} />

//       <DownloadCard
//         files={results}
//         isLoading={isLoading}
//         isError={isError}
//         hasSearched={didSearch || (isSuccessAll && allMaterials?.length > 0)}
//         didSearch={didSearch} isSearchEmpty={false}      />
//     </div>
//   )
// }

// export default InterviewMaterialsHub




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
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

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

  // Results logic - תיקון הלוגיקה הראשית
  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      // יש טקסט חיפוש - בצע חיפוש
      setHasSearched(true)
      if (isSuccessSearch && searchResults) {
        setResults(searchResults)
      }
    } else {
      // אין טקסט חיפוש - הצג את כל הקבצים
      if (isSuccessAll && allMaterials) {
        setResults(allMaterials)
      } else {
        setResults([])
      }
    }
  }, [query, isSuccessAll, allMaterials, isSuccessSearch, searchResults])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()
    setDebouncedQuery(trimmedQuery)
    if (trimmedQuery) {
      setHasSearched(true)
    }
  }

  const isLoading = isLoadingAll || isLoadingSearch
  const isError = isErrorAll || isErrorSearch
  const isSearchEmpty = query.trim() === ""
  const didSearch = !isSearchEmpty && hasSearched

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary/5 to-secondary/10" dir="rtl">
      <SearchBox query={query} setQuery={setQuery} onSearch={handleSearch} loading={isLoading} />
      <DownloadCard
        files={results}
        isLoading={isLoading}
        isError={isError}
        hasSearched={hasSearched}
        didSearch={didSearch}
        isSearchEmpty={isSearchEmpty}
      />
    </div>
  )
}

export default InterviewMaterialsHub
