// import { useState } from "react";
// import { interview_materials_subType } from "../types/interview_materials_subType";
// const SearchBox = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<interview_materials_subType[]>([]);

//   const handleSearch = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     const res = await fetch(`/api/interview-materials/search?q=${encodeURIComponent(query)}`);
//     const data = await res.json();
//     setResults(data);
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <label htmlFor="search" className="sr-only">
//         חיפוש
//       </label>
//       <div className="relative">
//         <input
//           type="search"
//           id="search"
//           name="search"
//           placeholder="חפש כאן..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="
//             w-full
//             border
//             border-gray-300
//             rounded-lg
//             py-3
//             pl-4
//             pr-12
//             text-text-main
//             placeholder:text-text-secondary
//             focus:outline-none
//             focus:ring-2
//             focus:ring-primary
//             focus:border-primary-dark
//             transition
//             duration-200
//             ease-in-out
//           "
//         />
//         <button
//           type="submit"
//           className="
//             absolute
//             inset-y-0
//             right-0
//             flex
//             items-center
//             pr-3
//             text-primary
//             hover:text-primary-dark
//             focus:outline-none
//           "
//           aria-label="Search"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
//             />
//           </svg>
//         </button>
//       </div>
//       {results.length > 0 && (
//         <div className="space-y-2">
//           {results.map((item) => (
//             <div key={item.id} className="flex gap-4 border p-3 rounded shadow-sm">
//               <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
//               <div>
//                 <h2 className="text-lg font-bold text-primary">{item.title}</h2>
//                 <p className="text-sm text-text-secondary">{item.short_description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// export default SearchBox
import React, { useState } from "react";
import { interview_materials_subType } from "../types/interview_materials_subType";

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<interview_materials_subType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/interview-materials/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="search"
            id="search"
            name="search"
            placeholder="חפש קובץ לפי כותרת או תיאור..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-3 pl-4 pr-12 text-text-main placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-dark transition duration-200 ease-in-out"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary hover:text-primary-dark"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {loading && <p className="mt-4 text-sm text-gray-500">טוען תוצאות...</p>}

      {!loading && results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((item) => (
            <div key={item.id} className="flex gap-4 border p-4 rounded-lg shadow-sm bg-white">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div>
                <h2 className="text-lg font-semibold text-primary">{item.title}</h2>
                <p className="text-sm text-text-secondary mt-1">{item.short_description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && query.trim() !== '' && (
        <p className="mt-6 text-sm text-gray-500">לא נמצאו תוצאות מתאימות 🙁</p>
      )}
    </div>
  );
};

export default SearchBox;
