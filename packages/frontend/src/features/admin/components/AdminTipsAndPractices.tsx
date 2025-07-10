import React, { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FiEdit, FiTrash2 } from 'react-icons/fi';  // אייקון עריכה ומחיקה
import { IoSearchOutline } from 'react-icons/io5';  // אייקון חיפוש
import { useGetAllTipsQuery } from '../services/TipsAndPracticesAdminApi';
import { useGetAllPracticesQuery } from '../services/TipsAndPracticesAdminApi';

const AdminTipsAndPractices = () => {
  const [searchTips, setSearchTips] = useState('');
  const [searchPractices, setSearchPractices] = useState('');

  // Fetching tips and practices
  const { data: tips, isLoading: tipsLoading, isError: tipsError } = useGetAllTipsQuery();
  const { data: practices, isLoading: practicesLoading, isError: practicesError } = useGetAllPracticesQuery();

  const handleSearchTips = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTips(event.target.value);
  };

  const handleSearchPractices = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPractices(event.target.value);
  };

  // Filter tips based on search
  const filteredTips = tips?.filter(tip => tip.content.includes(searchTips)) || [];

  // Filter practices based on search
  const filteredPractices = practices?.filter(practice => practice.content.includes(searchPractices)) || [];

  if (tipsLoading || practicesLoading) {
    return <p> טוען נתונים... </p>;
  }

  if (tipsError || practicesError) {
    return <p> אירעה שגיאה בעת טעינת הנתונים. </p>;
  }

  // Styling
  const columnStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center' as 'left' | 'center' | 'right',  // מתקנים את הסוג
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const searchBarContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    width: '45%',
    borderRadius: '5px',
    border: '1px solid #ddd',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f9' }}>

      <div style={columnStyle}>
        {/* טיפים */}
        <div style={{ width: '48%' }}>
          <h2 style={sectionTitleStyle}>טיפים</h2>
          <div style={searchBarContainerStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IoSearchOutline style={{ marginRight: '8px', fontSize: '20px' }} />
              <input
                type="text"
                placeholder="חיפוש טיפים..."
                value={searchTips}
                onChange={handleSearchTips}
                style={inputStyle}
              />
            </div>
            <button style={buttonStyle}>
              <RiAddLine style={{ marginRight: '8px' }} />
              הוספת טיפ
            </button>
          </div>

          <div>
            {Array.isArray(filteredTips) && filteredTips.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {filteredTips.map((tip, index) => (
                  <li key={index} style={{ padding: '10px', margin: '5px 0', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    {tip.content}
                    <div style={{ marginTop: '10px' }}>
                      <button style={{ ...buttonStyle, backgroundColor: '#f44336' }}>
                        <FiTrash2 style={{ marginRight: '8px' }} />
                      </button>
                      <button style={{ ...buttonStyle, backgroundColor: '#2196F3' }}>
                        <FiEdit style={{ marginRight: '8px' }} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>לא נמצאו טיפים לפי החיפוש שלך.</p>
            )}
          </div>
        </div>

        {/* תרגולים */}
        <div style={{ width: '48%' }}>
          <h2 style={sectionTitleStyle}>שאלות לתרגול</h2>
          <div style={searchBarContainerStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IoSearchOutline style={{ marginRight: '8px', fontSize: '20px' }} />
              <input
                type="text"
                placeholder="חיפוש שאלות לתרגול..."
                value={searchPractices}
                onChange={handleSearchPractices}
                style={inputStyle}
              />
            </div>
            <button style={buttonStyle}>
              <RiAddLine style={{ marginRight: '8px' }} />
              הוספת שאלה לתרגול
            </button>
          </div>

          <div>
            {Array.isArray(filteredPractices) && filteredPractices.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {filteredPractices.map((practice, index) => (
                  <li key={index} style={{ padding: '10px', margin: '5px 0', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    {practice.content}
                    <div style={{ marginTop: '10px' }}>
                      <button style={{ ...buttonStyle, backgroundColor: '#f44336' }}>
                        <FiTrash2 style={{ marginRight: '8px' }} />
                      </button>
                      <button style={{ ...buttonStyle, backgroundColor: '#2196F3' }}>
                        <FiEdit style={{ marginRight: '8px' }} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>לא נמצאו שאלות לתרגול לפי החיפוש שלך.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTipsAndPractices;
