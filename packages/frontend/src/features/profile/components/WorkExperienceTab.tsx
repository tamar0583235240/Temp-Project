import React from "react";
import { useForm } from "react-hook-form";
import {
  useGetWorkExperiencesQuery,
  useCreateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
} from "../services/workExperienceApi";

const WorkExperienceTab = ({ userId }: { userId: string }) => {
  const { register, handleSubmit, reset } = useForm();
  const { data = [], refetch } = useGetWorkExperiencesQuery(userId);
  const [createExperience] = useCreateWorkExperienceMutation();
  const [deleteExperience] = useDeleteWorkExperienceMutation();

  const onSubmit = async (formData: any) => {
    await createExperience({ ...formData, userId }).unwrap();
    reset();
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteExperience(id).unwrap();
    refetch();
  };

  return (
    <div>
      <h2>ניסיון תעסוקתי</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("companyName")} placeholder="שם מקום עבודה" required />
        <input {...register("position")} placeholder="תפקיד" required />
        <textarea {...register("description")} placeholder="תיאור התפקיד" required />
        <input type="date" {...register("startDate")} required />
        <input type="date" {...register("endDate")} />
        <label>
          הצג בפרופיל ציבורי
          <input type="checkbox" {...register("isPublic")} />
        </label>
        <button type="submit">שמור</button>
      </form>

      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            <strong>{item.companyName}</strong> - {item.position}
            <button onClick={() => handleDelete(item.id)}>מחק</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkExperienceTab;
