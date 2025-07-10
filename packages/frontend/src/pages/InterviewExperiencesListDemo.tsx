// בס"ד
import { useState } from "react";

export const InterviewExperiencesListDemo = () => {
  // נתוני דמה
  const [experiences] = useState([
    {
      id: "1",
      company_name: "Google",
      position: "Frontend Developer",
      rating: 4,
      description: "ראיון מאוד מקצועי עם שאלות טכניות",
      created_at: "2024-06-15",
      anonymous: false,
      thanks: 3
    },
    {
      id: "2",
      company_name: "Meta",
      position: "Backend Developer",
      rating: 5,
      description: "הראיון זרם מעולה עם ראיון HR מעניין",
      created_at: "2024-07-01",
      anonymous: true,
      thanks: 7
    },
    {
      id: "3",
      company_name: "Microsoft",
      position: "QA Engineer",
      rating: 3,
      description: "שאלו אותי הרבה על בדיקות אוטומטיות",
      created_at: "2024-06-20",
      anonymous: false,
      thanks: 2
    },
  ]);

  const [searchCompany, setSearchCompany] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [minThanks, setMinThanks] = useState(0);
  const [filterDate, setFilterDate] = useState("");

  const filteredExperiences = experiences.filter((exp) => {
    return (
      exp.company_name.toLowerCase().includes(searchCompany.toLowerCase()) &&
      (filterPosition === "" || exp.position === filterPosition) &&
      exp.thanks >= minThanks &&
      (filterDate === "" || exp.created_at >= filterDate)
    );
  });

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">רשימת חוויות ראיונות</h1>

      {/* שדות סינון */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">שם חברה</label>
          <input
            type="text"
            placeholder="חיפוש לפי שם חברה"
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">תפקיד</label>
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">כל התפקידים</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">כמות תודות מינימלית 🙏</label>
          <input
            type="number"
            placeholder="מינימום תודות"
            value={minThanks}
            onChange={(e) => setMinThanks(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">תאריך פרסום (מ-)</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* תוצאות */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              {exp.company_name} - {exp.position}
            </h2>
            <p className="text-sm text-gray-500 mb-1">תאריך: {exp.created_at}</p>
            <p className="text-sm text-gray-500 mb-1">תודות: {exp.thanks}</p>
            <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};