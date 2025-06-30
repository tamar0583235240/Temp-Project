import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { allowedTypes } from "../types/fileTypes";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { cn } from "../../../shared/utils/cn";
import { useState } from "react";

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
    })
    .test("maxSize", "הקובץ חורג מהגודל המרבי (10MB)", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return file.size <= 10 * 1024 * 1024;
    }),
});

interface CreateInterviewMaterialsSubFormProps {
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;
}

export const CreateInterviewMaterialsSubForm = ({
  onSubmit,
  onCancel,
}: CreateInterviewMaterialsSubFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedThumbnailName, setSelectedThumbnailName] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const onValid = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("short_description", data.shortDescription);
    if (data.thumbnail?.length) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.file?.length) {
      formData.append("file", data.file[0]);
    }

    onSubmit(formData);
    setShowSuccessMessage(true);
    reset();
    setSelectedThumbnailName(null);
    setSelectedFileName(null);
    setTimeout(() => setShowSuccessMessage(false), 4000);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-card space-y-5 text-right"
      dir="rtl"
    >
      {showSuccessMessage && (
        <p className="text-green-600 font-semibold text-sm bg-green-100 p-2 rounded-md border border-green-400">
          הפריט נוסף בהצלחה!
        </p>
      )}

      {/* כותרת */}
      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="title">
          כותרת
        </label>
        <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      {/* תיאור קצר */}
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

      {/* העלאת תמונה ממוזערת */}
      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="thumbnail">
          תמונה ממוזערת (אופציונלי)
        </label>
        <div className="relative w-full">
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedThumbnailName(file?.name || null);
            }}
            className="hidden"
          />
          <label
            htmlFor="thumbnail"
            className="inline-block cursor-pointer bg-muted text-muted-foreground hover:bg-muted/80 text-sm font-medium py-2 px-4 rounded-md border border-gray-300 w-full text-center"
          >
            בחרי תמונה
          </label>
          {selectedThumbnailName && (
            <p className="text-sm text-gray-600 mt-1">📁 {selectedThumbnailName}</p>
          )}
        </div>
        {errors.thumbnail && (
          <p className="text-sm text-red-600 mt-1">{errors.thumbnail.message}</p>
        )}
      </div>

      {/* העלאת קובץ */}
      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="file">
          צרף קובץ (PDF, Word, אודיו וכו’)
        </label>
        <div className="relative w-full">
          <input
            id="file"
            type="file"
            {...register("file")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedFileName(file?.name || null);
            }}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="inline-block cursor-pointer bg-muted text-muted-foreground hover:bg-muted/80 text-sm font-medium py-2 px-4 rounded-md border border-gray-300 w-full text-center"
          >
            בחרי קובץ
          </label>
          {selectedFileName && (
            <p className="text-sm text-gray-600 mt-1">📁 {selectedFileName}</p>
          )}
        </div>
        {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file.message}</p>}
      </div>

      {/* כפתורי שליחה וביטול */}
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
