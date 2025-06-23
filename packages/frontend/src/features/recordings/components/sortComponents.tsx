import React from 'react';
import './sortComponents.css';


export const SortComponents = (props: {
  sortOption: string;
  setSortOption: (value: string) => void;
}) => {
  const { sortOption, setSortOption } = props;

  return (
    <div className="sort-container">
      <div className="sort-label-container">
        <span className="sort-label">מיין לפי:</span>
        <select
          className="sort-select"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="latest">מהחדש לישן</option>
          <option value="oldest">מהישן לחדש</option>
          <option value="mostFeedbacks">כמות פידבקים מגבוה לנמוך</option>
          <option value="leastFeedbacks">כמות פידבקים מהנמוך לגבוה</option>
        </select>
      </div>
    </div>
  );
};


