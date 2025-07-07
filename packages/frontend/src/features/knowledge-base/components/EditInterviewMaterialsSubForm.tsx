import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { allowedTypes } from "../types/fileTypes";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { cn } from "../../../shared/utils/cn";
import { useEffect, useState } from "react";
import { useUpdateInterviewMaterialMutation } from "../../../shared/api/interviewMaterialsApi";

// סכמת ולידציה
const schema = yup.object({
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
}).required();
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
    const [updateMaterial, { isLoading }] = useUpdateInterviewMaterialMutation();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
            thumbnail: null,
            file: null,
        },
    });
    useEffect(() => {
        reset({
            title: defaultValues.title || "",
            shortDescription: defaultValues.shortDescription || "",
            thumbnail: null,
            file: null,
        });
    }, [defaultValues, reset]);
    const onValid = async (data: FormValues) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("short_description", data.shortDescription);
        if (data.thumbnail?.length) {
            formData.append("thumbnail", data.thumbnail[0]);
        }
        if (data.file?.length) {
            formData.append("file", data.file[0]);
        }
        try {
            await updateMaterial({ id, formData }).unwrap();
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 4000);
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
            {showSuccessMessage && (
                <p className="text-green-600 font-semibold text-sm bg-green-100 p-2 rounded-md border border-green-400">
                    השינויים נשמרו בהצלחה!
                </p>
            )}
            <div>
                <label htmlFor="title" className="block mb-1 font-semibold text-sm text-text-main">
                    כותרת
                </label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="shortDescription" className="block mb-1 font-semibold text-sm text-text-main">
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
                <label htmlFor="thumbnail" className="block mb-1 font-semibold text-sm text-text-main">
                    תמונה ממוזערת (אופציונלי)
                </label>
                <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    {...register("thumbnail")}
                    className="w-full text-sm"
                />
                {errors.thumbnail && (
                    <p className="text-sm text-red-600 mt-1">{errors.thumbnail.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="file" className="block mb-1 font-semibold text-sm text-text-main">
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
