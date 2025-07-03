import { Request, Response } from "express";
import { getAllMaterialsFromDb } from "../reposioty/interviewMaterialsRepository";
import { deleteMaterialById, getMaterialById } from "../reposioty/interviewMaterialsRepository";
import { deleteFileFromCloudinary } from "../config/cloudinary";

export async function deleteInterviewMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const material = await getMaterialById(id);

    if (!material) {
      return res.status(404).json({ message: "פריט לא נמצא" });
    }

    const extractPublicId = (url: string) => {
      const match = url.match(/\/([^/]+)\.[a-zA-Z]+$/);
      return match?.[1];
    };

    if (material.thumbnail) {
      const thumbId = extractPublicId(material.thumbnail);
      if (thumbId) await deleteFileFromCloudinary(`thumbnails/${thumbId}`);
    }

    if (material.file_url) {
      const fileId = extractPublicId(material.file_url);
      if (fileId) await deleteFileFromCloudinary(`files/${fileId}`);
    }

    await deleteMaterialById(id);

    res.status(200).json({ message: "הפריט נמחק בהצלחה" });
  } catch (err) {
    console.error("שגיאה במחיקת פריט:", err);
    res.status(500).json({ message: "שגיאה במחיקה" });
  }
}

export async function getAllInterviewMaterials(req: Request, res: Response) {
  try {
    const items = await getAllMaterialsFromDb();

    const itemsWithUrls = items.map((item) => ({
      ...item,
      thumbnailUrl: item.thumbnail || null,
      fileUrl: item.file_url || null,
    }));

    res.status(200).json(itemsWithUrls);
  } catch (error) {
    console.error("Error fetching interview materials:", error);
    res.status(500).json({ message: "שגיאה בשליפת חומרי ריאיון" });
  }
}
