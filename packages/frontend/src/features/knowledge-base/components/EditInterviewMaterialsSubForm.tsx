// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useUpdateInterviewMaterialSubMutation } from '../services/interviewMaterialApi';
// import { Input } from '../../../shared/ui/input';
// import { Button } from  '../../../shared/ui/button';

// interface EditFormProps {
//   id: string;
//   defaultValues: {
//     title: string;
//     short_description: string;
//   };
//   onSuccess: () => void;
// }

// interface FormData {
//   title: string;
//   short_description: string;
//   thumbnail?: FileList;
//   file?: FileList;
// }

// const EditInterviewMaterialForm: React.FC<EditFormProps> = ({ id, defaultValues, onSuccess }) => {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
//     defaultValues,
//   });

//   useEffect(() => {
//     reset(defaultValues);
//   }, [defaultValues, reset]);

//   const [updateInterviewMaterialSub, { isLoading, error }] = useUpdateInterviewMaterialSubMutation();

//   const onSubmit = async (data: FormData) => {
//     const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('short_description', data.short_description);
//     if (data.thumbnail && data.thumbnail.length > 0) {
//       formData.append('thumbnail', data.thumbnail[0]);
//     }
//     if (data.file && data.file.length > 0) {
//       formData.append('file', data.file[0]);
//     }
//     try {
//       await updateInterviewMaterialSub({ id, formData }).unwrap();
//       onSuccess();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//       <div>
//         <label htmlFor="title" className="block mb-1 font-semibold">כותרת</label>
//         <Input
//           id="title"
//           {...register('title', { required: 'שדה חובה' })}
//           aria-invalid={errors.title ? "true" : "false"}
//         />
//         {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="short_description" className="block mb-1 font-semibold">תיאור קצר</label>
//         <textarea
//           id="short_description"
//           {...register('short_description', { required: 'שדה חובה' })}
//           className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
//           rows={3}
//           aria-invalid={errors.short_description ? "true" : "false"}
//         />
//         {errors.short_description && <p className="text-red-600 text-sm mt-1">{errors.short_description.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="thumbnail" className="block mb-1 font-semibold">תמונה ממוזערת (אופציונלי)</label>
//         <input
//           id="thumbnail"
//           type="file"
//           accept="image/*"
//           {...register('thumbnail')}
//         />
//       </div>

//       <div>
//         <label htmlFor="file" className="block mb-1 font-semibold">צרוף קובץ (PDF, Word, אודיו וכו’)</label>
//         <input
//           id="file"
//           type="file"
//           {...register('file')}
//         />
//       </div>

//       {error && (
//         <p className="text-red-600 text-center mt-2">
//           קרתה שגיאה בזמן השמירה. נסה שוב.
//         </p>
//       )}

//       <Button type="submit" disabled={isSubmitting || isLoading}>
//         {isLoading ? 'שומר...' : 'שמור'}
//       </Button>
//     </form>
//   );
// };

// export default EditInterviewMaterialForm;
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { allowedTypes } from "../types/fileTypes";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { cn } from "../../../shared/utils/cn";
import { useEffect } from "react";
import { useUpdateInterviewMaterialSubMutation } from "../services/interviewMaterialApi";

// הסכמה (כוללת תיאורים מדויקים)
const schema = yup
  .object({
    title: yup.string().required("שדה חובה"),
    shortDescription: yup.string().required("שדה חובה"),
    thumbnail: yup
      .mixed<FileList>()
      .nullable()
      .test("imageType", "רק קובץ תמונה תקף", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].type.startsWith("image/");
      }),
    file: yup
      .mixed<FileList>()
      .nullable()
      .test("validType", "סוג קובץ לא נתמך", (value) => {
        if (!value || value.length === 0) return true;
        return allowedTypes.includes(value[0].type);
      }),
  })
  .required();

// טיפוס שמוסק מה־schema
type FormValues = yup.InferType<typeof schema>;

interface EditInterviewMaterialsSubFormProps {
  id: string;
  defaultValues: Partial<FormValues>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EditInterviewMaterialsSubForm = ({
  id,
  defaultValues,
  onSuccess,
  onCancel,
}: EditInterviewMaterialsSubFormProps) => {
  const [updateMaterial, { isLoading, error }] = useUpdateInterviewMaterialSubMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      title: defaultValues.title || "",
      shortDescription: defaultValues.shortDescription || "",
      thumbnail: defaultValues.thumbnail ?? null,
      file: defaultValues.file ?? null,
    },
  });

  useEffect(() => {
    reset({
      title: defaultValues.title || "",
      shortDescription: defaultValues.shortDescription || "",
      thumbnail: defaultValues.thumbnail ?? null,
      file: defaultValues.file ?? null,
    });
  }, [defaultValues, reset]);

  const onValid = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("shortDescription", data.shortDescription);
    if (data.thumbnail?.length) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.file?.length) {
      formData.append("file", data.file[0]);
    }

    try {
      await updateMaterial({ id, formData }).unwrap();
      onSuccess?.();
    } catch (e) {
      console.error("שגיאה בעדכון:", e);
    }
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
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold text-sm text-text-main" htmlFor="shortDescription">
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
        <input id="file" type="file" {...register("file")} className="w-full text-sm" />
        {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file.message}</p>}
      </div>

      {error && (
        <p className="text-red-600 text-center text-sm mt-2">
          אירעה שגיאה בזמן השמירה. נסה שוב.
        </p>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting || isLoading} className="flex-1">
          {isLoading ? "שומר..." : "שמור שינויים"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
};
