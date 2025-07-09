import { Request, Response } from "express";
import {
    getInterviewMaterials,
    getInterviewMaterialById,
    createInterviewMaterial,
    updateInterviewMaterial,
    deleteInterviewMaterial
} from "../reposioty/InterviewMaterialSubRepository";
import {
    uploadFileToCloudinary,
    deleteFileFromCloudinary
} from "../config/cloudinary";

// 🟢 שליפת כל חומרי הריאיון
export const getAllInterviewMaterials = async (req: Request, res: Response) => {
    try {
        const items = await getInterviewMaterials();
        const itemsWithUrls = items.map((item) => ({
            ...item,
            thumbnailUrl: item.thumbnail || null,
            fileUrl: item.fileUrl || null,
        }));
        res.status(200).json(itemsWithUrls);
    } catch (error) {
        console.error("Error fetching interview materials:", error);
        res.status(500).json({ message: "שגיאה בשליפת חומרי ריאיון" });
    }
};

// 🟢 יצירת חומר ריאיון חדש
export const addInterviewMaterial = async (req: Request, res: Response) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const thumbnailFile = files?.thumbnail?.[0];
        const file = files?.file?.[0];
        if (!file) {
            res.status(400).json({ message: "לא הועלה קובץ" });
            return;
        }

        let thumbnailUrl = '';
        if (thumbnailFile) {
            const thumbnailResult = await uploadFileToCloudinary(thumbnailFile, 'interviewMaterialsHub/thumbnails');
            thumbnailUrl = thumbnailResult.secure_url;
        }


        const fileResult = await uploadFileToCloudinary(file, 'interviewMaterialsHub/files');

        const created = await createInterviewMaterial(
            req.body.title,
            thumbnailUrl,
            req.body.short_description,
            fileResult.secure_url
        );

        res.status(201).json({
            message: "הפריט נשמר בהצלחה",
            data: created,
        });
    } catch (err) {
        console.error("Upload error:", err);
        if (err instanceof Error) {
            console.error("Error message:", err.message);
        }
        res.status(500).json({ message: "שגיאה בשרת", error: err });
    }
};

// 🟢 עדכון חומר ריאיון קיים
export const updateInterviewMaterialController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, short_description } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
        const existingMaterial = await getInterviewMaterialById(id);
        if (!existingMaterial) {
            res.status(404).json({ message: "חומר ריאיון לא נמצא" });
            return;
        }

        let updatedThumbnail = existingMaterial.thumbnail;
        let updatedFileUrl = existingMaterial.fileUrl;

        const extractPublicId = (url?: string | null) => {
            if (typeof url !== "string") return null;
            const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|pdf|mp4|webm|svg|gif)$/);
            return match?.[1];
        };

        if (files?.thumbnail?.[0]) {
            const publicId = extractPublicId(existingMaterial.thumbnail);
            if (publicId) await deleteFileFromCloudinary(`interviewMaterialsHub/thumbnails/${publicId}`);
            const thumbUpload = await uploadFileToCloudinary(files.thumbnail[0], 'interviewMaterialsHub/thumbnails');
            updatedThumbnail = thumbUpload.secure_url;
        }

        if (files?.file?.[0]) {
            const publicId = extractPublicId(existingMaterial.fileUrl);
            if (publicId) await deleteFileFromCloudinary(`interviewMaterialsHub/files/${publicId}`);
            const fileUpload = await uploadFileToCloudinary(files.file[0], 'interviewMaterialsHub/files');
            updatedFileUrl = fileUpload.secure_url;
        }

        const updated = await updateInterviewMaterial(
            id,
            title || existingMaterial.title,
            short_description || existingMaterial.short_description,
            updatedThumbnail,
            updatedFileUrl
        );

        res.json(updated);
    } catch (error) {
        console.error("Error updating interview material:", error);
        res.status(500).json({ message: "שגיאה בעדכון" });
    }
};

// 🟢 מחיקת חומר ריאיון
export const deleteInterviewMaterialController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const material = await getInterviewMaterialById(id);
        if (!material) {
            return res.status(404).json({ message: "פריט לא נמצא" });
        }

        const extractPublicId = (url: string) => {
            const match = url.match(/\/([^/]+)\.[a-zA-Z]+$/);
            return match?.[1];
        };

        if (material.thumbnail) {
            const thumbId = extractPublicId(material.thumbnail);
            if (thumbId) await deleteFileFromCloudinary(`interviewMaterialsHub/thumbnails/${thumbId}`);
        }

        if (material.fileUrl) {
            const fileId = extractPublicId(material.fileUrl);
            if (fileId) await deleteFileFromCloudinary(`interviewMaterialsHub/files/${fileId}`);
        }

        await deleteInterviewMaterial(id);
        res.status(200).json({ message: "הפריט נמחק בהצלחה" });
    } catch (err) {
        console.error("שגיאה במחיקת פריט:", err);
        res.status(500).json({ message: "שגיאה במחיקה" });
    }
};