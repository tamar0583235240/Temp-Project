import React, { useState } from 'react';
import { Answer } from '../types/Answer';

const categories = [
  'שמלות לנשים',
  'טופים, חולצות וחולצות טי',
  'חלק תחתון לנשים',
  'סווטשירט לנשים',
  'ג\'ינס נשים',
  'חליפות נשים',
];

const FilteringComponents = () => {
  const [date, setDate] = useState('תאריך');
  const [questionName, setQuestionName] = useState('שאלה');
  const [amountFeedbacks, setAmountFeedbacks] = useState('כמות פידבקים');
  const [recordings,setRecordings] = useState<Answer[]>();
//   const [showMore, setShowMore] = useState(false);

//   const visibleCategories = showMore ? categories : categories.slice(0, 4);

  return (
    <div style={{ direction: 'rtl', width: '200px', fontFamily: 'Arial' }}>
      <h3>תאריך</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categories.map((cat) => (
          <li key={cat} style={{ marginBottom: '8px' }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={date === cat}
                onChange={() => setDate(cat)}
                style={{ marginLeft: '6px' }}
              />
              {cat}
            </label>
          </li>
        ))}
      </ul>
      <h3>שאלה</h3>
      <h3>כמות פידבקים</h3>
      {/* <button
        onClick={() => setShowMore((prev) => !prev)}
        style={{
          background: 'none',
          border: 'none',
          color: 'black',
          textDecoration: 'underline',
          cursor: 'pointer',
          padding: 0,
          marginTop: '8px',
        }}
      >
        {showMore ? 'הסתר' : 'הצג עוד'} +
      </button> */}

    </div>
  );
};

export default FilteringComponents;