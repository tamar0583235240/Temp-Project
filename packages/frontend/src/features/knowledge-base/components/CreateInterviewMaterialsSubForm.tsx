import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InterviewMaterialsSubFormData } from "../types/formTypes";

const schema: yup.ObjectSchema<InterviewMaterialsSubFormData> = yup.object({
  title: yup.string().required("שדה חובה"),
  shortDescription: yup.string().required("שדה חובה"),
  thumbnail: yup.string().url("כתובת לא תקינה").nullable().notRequired(),
  file: yup
    .mixed<FileList>()
    .test("fileType", "קובץ לא תקין", (value) => {
      if (!value || !(value instanceof FileList || Array.isArray(value))) return true;
      if (value.length === 0) return true;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "video/mp4",
        "video/x-msvideo",
      ];
      return allowedTypes.includes(value[0].type);
    }),
});

export const CreateInterviewMaterialsSubForm = ({
  onSubmit,
}: {
  onSubmit: (data: InterviewMaterialsSubFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterviewMaterialsSubFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>כותרת:</label>
        <input {...register("title")} className="border p-1 w-full" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>תיאור קצר:</label>
        <textarea {...register("shortDescription")} className="border p-1 w-full" />
        {errors.shortDescription && (
          <p className="text-red-500">{errors.shortDescription.message}</p>
        )}
      </div>

      <div>
        <label>תמונה מייצגת (כתובת URL):</label>
        <input {...register("thumbnail")} className="border p-1 w-full" />
        {errors.thumbnail && (
          <p className="text-red-500">{errors.thumbnail.message}</p>
        )}
      </div>

      <div>
        <label>צרף קובץ (PDF, Word, וידאו וכו'):</label>
        <input type="file" {...register("file")} className="w-full" />
        {errors.file && <p className="text-red-500">{errors.file.message as string}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        צור פריט חדש
      </button>
    </form>
  );
};
