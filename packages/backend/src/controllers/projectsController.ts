import { Request, Response } from "express";
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../reposioty/projectsRepository";
import {
    uploadFileToCloudinary,
    deleteFileFromCloudinary,
} from "../config/cloudinary";

// 🟢 שליפת כל הפרויקטים של משתמש
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const projects = await getProjects(userId);
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "שגיאה בשליפת הפרויקטים" });
    }
};

// 🟢 שליפת פרויקט בודד לפי ID
export const getProjectByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await getProjectById(id);
        if (!project) {
            return res.status(404).json({ message: "פרויקט לא נמצא" });
        }
        res.json(project);
    } catch (error) {
        console.error("שגיאה בשליפת פרויקט לפי ID:", error);
        res.status(500).json({ message: "שגיאה בשרת" });
    }
};

// 🟢 יצירת פרויקט חדש
export const addProject = async (req: Request, res: Response) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const thumbnailFile = files?.thumbnail?.[0];

        let thumbnailUrl = '';
        if (thumbnailFile) {
            const thumbnailResult = await uploadFileToCloudinary(thumbnailFile, 'projects/thumbnails');
            thumbnailUrl = thumbnailResult.secure_url;
        }

        const { user_id, title, description, demo_url, code_url, is_public } = req.body;

        const created = await createProject({
            user_id,
            title,
            description,
            demo_url,
            code_url,
            thumbnail: thumbnailUrl,
            is_public: is_public === 'true',
        });

        res.status(201).json({
            message: "הפרויקט נשמר בהצלחה",
            data: created,
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "שגיאה בשרת", error: err });
    }
};

// 🟢 עדכון פרויקט קיים
export const updateProjectController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
        const existingProject = await getProjectById(id);
        if (!existingProject) {
            res.status(404).json({ message: "פרויקט לא נמצא" });
            return;
        }

        let updatedThumbnail = existingProject.thumbnailUrl;

        const extractPublicId = (url: string) => {
            const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|gif|svg)$/);
            return match?.[1];
        };

        if (files?.thumbnail?.[0]) {
            const publicId = extractPublicId(existingProject.thumbnailUrl ?? "");
            if (publicId) await deleteFileFromCloudinary(`projects/thumbnails/${publicId}`);
            const thumbUpload = await uploadFileToCloudinary(files.thumbnail[0], 'projects/thumbnails');
            updatedThumbnail = thumbUpload.secure_url;
        }

        const { title, description, demo_url, code_url, is_public } = req.body;

        const updated = await updateProject(id, {
            title: title || existingProject.title,
            description: description || existingProject.description,
            demo_url: demo_url || existingProject.demoUrl,
            code_url: code_url || existingProject.codeUrl,
            thumbnail: updatedThumbnail ?? undefined,
            is_public: is_public !== undefined ? is_public === 'true' : (existingProject.isPublic ?? undefined),
        });

        res.json(updated);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "שגיאה בעדכון הפרויקט" });
    }
};

// 🟢 מחיקת פרויקט
export const deleteProjectController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await getProjectById(id);
        if (!project) {
            return res.status(404).json({ message: "פרויקט לא נמצא" });
        }

        const extractPublicId = (url: string) => {
            const match = url.match(/\/([^/]+)\.[a-zA-Z]+$/);
            return match?.[1];
        };

        if (project.thumbnailUrl) {
            const thumbId = extractPublicId(project.thumbnailUrl);
            if (thumbId) await deleteFileFromCloudinary(`projects/thumbnails/${thumbId}`);
        }

        await deleteProject(id);
        res.status(200).json({ message: "הפרויקט נמחק בהצלחה" });
    } catch (err) {
        console.error("שגיאה במחיקת פרויקט:", err);
        res.status(500).json({ message: "שגיאה במחיקה" });
    }
};
