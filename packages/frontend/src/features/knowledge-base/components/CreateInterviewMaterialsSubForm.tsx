import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { allowedTypes } from "../types/fileTypes";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { cn } from "../../../shared/utils/cn";

const schema = yup.object({
  title: yup.string().required("שדה חובה"),
  shortDescription: yup.string().required("שדה חובה"),
  thumbnail: yup
    .mixed<FileList>()
    .test("imageType", "רק קובץ תמונה תקף", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return file && file.type.startsWith("image/");
    })
    .nullable(),
  file: yup
    .mixed<FileList>()
    .required("יש לצרף קובץ")
    .test("hasFile", "יש לצרף קובץ", (value) => {
      return value && value.length > 0;
    })
    .test("validType", "סוג קובץ לא נתמך", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return allowedTypes.includes(file.type);
    }),
});

interface CreateInterviewMaterialsSubFormProps {
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;  // הוספתי כאן
}

export const CreateInterviewMaterialsSubForm = ({
  onSubmit,
  onCancel,
}: CreateInterviewMaterialsSubFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onValid = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("shortDescription", data.shortDescription);
    if (data.thumbnail?.length) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.file?.length) {
      formData.append("file", data.file[0]);
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-card space-y-5 text-right"
      dir="rtl"
    >
      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="title">
          כותרת
        </label>
        <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label
          className="block mb-1 font-semibold text-sm text-text-main"
          htmlFor="shortDescription"
        >
          תיאור קצר
        </label>
        <textarea
          id="shortDescription"
          {...register("shortDescription")}
          className={cn(
            "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]",
            errors.shortDescription && "border-red-500"
          )}
          rows={3}
        />
        {errors.shortDescription && (
          <p className="text-sm text-red-600 mt-1">{errors.shortDescription.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="thumbnail">
          תמונה ממוזערת (אופציונלי)
        </label>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          {...register("thumbnail")}
          className="w-full text-sm"
        />
        {errors.thumbnail && <p className="text-sm text-red-600 mt-1">{errors.thumbnail.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="file">
          צרף קובץ (PDF, Word, אודיו וכו’)
        </label>
        <input
          id="file"
          type="file"
          {...register("file")}
          className="w-full text-sm"
        />
        {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file.message}</p>}
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "שולח..." : "שמור"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
};
