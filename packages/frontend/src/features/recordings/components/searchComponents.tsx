import React from 'react';
import './searchComponents.css';

export const SearchComponents = (props: {
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const { searchText, setSearchText } = props;

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        type="text"
        placeholder="חפש הקלטה"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
    </div>
  );
};



