import React, { useState } from "react";
import { Input } from "../../../shared/ui/input";
import { Select } from "../../../shared/ui/Select";

interface FiltersState {
  topicId: string;
  difficulty: string;
  type: string;
  generatedByAi: boolean;
  search: string;
}

const FiltersBar = ({
  topics,
  onChange,
  initialFilters,
}: {
  topics: { id: string; name: string }[];
  onChange: (filters: FiltersState) => void;
  initialFilters?: Partial<FiltersState>;
}) => {
  const [filters, setFilters] = useState<FiltersState>({
    topicId: initialFilters?.topicId || "",
    difficulty: initialFilters?.difficulty || "",
    type: initialFilters?.type || "",
    generatedByAi: initialFilters?.generatedByAi || false,
    search: initialFilters?.search || "",
  });

  const handleChange = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Select
        value={filters.topicId}
        onChange={(val) => handleChange("topicId", val)}
        options={[
          { label: "הכל", value: "" },
          ...topics.map((topic) => ({ label: topic.name, value: topic.id })),
        ]}
      />

      <Select
        value={filters.difficulty}
        onChange={(val) => handleChange("difficulty", val)}
        options={[
          { label: "הכל", value: "" },
          { label: "קל", value: "easy" },
          { label: "בינוני", value: "medium" },
          { label: "קשה", value: "hard" },
        ]}
      />

      <Select
        value={filters.type}
        onChange={(val) => handleChange("type", val)}
        options={[
          { label: "הכל", value: "" },
          { label: "כן/לא", value: "yes_no" },
          { label: "טקסט חופשי", value: "free_text" },
          { label: "קטע קוד", value: "code" },
        ]}
      />

      <label className="flex items-center col-span-1 sm:col-span-1 text-sm">
        <input
          type="checkbox"
          className="mr-2 h-4 w-4"
          checked={filters.generatedByAi}
          onChange={(e) => handleChange("generatedByAi", e.target.checked)}
        />
        שאלות שנוצרו ב-AI
      </label>

      <Input
        placeholder="חיפוש לפי תוכן"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="sm:col-span-2"
      />
    </div>
  );
};

export default FiltersBar;
