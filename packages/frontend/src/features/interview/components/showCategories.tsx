import React from "react";
import { useGetAllCategoriesQuery } from "../services/categoriesApi";

const ShowCategories: React.FC = () => {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();

  if (isLoading) return <p>טוען קטגוריות...</p>;
  if (error) return <p>שגיאה בטעינת הקטגוריות</p>;

  return (
    <div>
      <h2>קטגוריות:</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowCategories;
