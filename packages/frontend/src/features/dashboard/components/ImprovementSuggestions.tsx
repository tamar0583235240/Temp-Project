import React from "react";

type ImprovementSuggestionsProps = {
  fullName: string;
};

const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({ fullName }) => {
  return (
    <div>
      <h2>הצעות לשיפור</h2>
      <p>שלום {fullName}, הנה ההצעות שלך לשיפור.</p>
      {/* כאן המשך הקומפוננטה שלך */}
    </div>
  );
};

export default ImprovementSuggestions;
