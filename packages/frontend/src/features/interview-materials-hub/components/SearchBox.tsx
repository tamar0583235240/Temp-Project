
import React from "react";
import { interview_materials_subType } from "../types/interview_materials_subType";

type Props = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
  results: interview_materials_subType[];
};

const SearchBox: React.FC<Props> = ({ query, setQuery, onSearch, loading, results }) => {
  console.log("laliiiii");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={onSearch}>
        <div className="relative">
          <input
            type="search"
            placeholder="חפש לפי כותרת או תיאור..."
              aria-label="חיפוש חומרי ריאיונות"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-3 pl-4 pr-12 text-text-main placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-dark transition duration-200 ease-in-out"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary hover:text-primary-dark"
           aria-label="חפש"
          >
            🔍
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
        <p className="mt-6 text-sm text-gray-500">לא נמצאו תוצאות 🙁</p>
      )}
    </div>
  );
};

export default SearchBox;
