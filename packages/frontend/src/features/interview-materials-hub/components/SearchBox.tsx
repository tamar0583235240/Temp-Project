// SearchBox.jsx (React)
export default function SearchBox() {
  return (
    <div className="max-w-md mx-auto">
      <label htmlFor="search" className="sr-only">
        חיפוש
      </label>
      <div className="relative">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="חפש כאן..."
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            py-3
            pl-4
            pr-12
            text-text-main
            placeholder:text-text-secondary
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            focus:border-primary-dark
            transition
            duration-200
            ease-in-out
          "
        />
        <button
          type="submit"
          className="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-3
            text-primary
            hover:text-primary-dark
            focus:outline-none
          "
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
    </div>
  );
}
