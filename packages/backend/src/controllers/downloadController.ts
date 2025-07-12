import { Request, Response } from "express";
import { getInterviewMaterialSubById } from "../repository/interviewMaterialSubRepository";
import { fetch } from "undici";
import { InterviewMaterialsSub } from "@interfaces/entities/InterviewMaterialsSub";

type InterviewMaterial = {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  fileUrl: string;
  originalFileName: string;
};

export const downloadInterviewMaterial = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    console.log("downloadInterviewMaterial called with id:", id);

    const dbMaterialRaw: any = await getInterviewMaterialSubById(id);
    if (!dbMaterialRaw) {
      return res.status(404).json({ message: "קובץ לא נמצא" });
    }

    const material: InterviewMaterial = {
      id: dbMaterialRaw.id,
      title: dbMaterialRaw.title,
      thumbnail: dbMaterialRaw.thumbnail,
      shortDescription: dbMaterialRaw.short_description,
      fileUrl: dbMaterialRaw.file_url,
      originalFileName: dbMaterialRaw.original_file_name,
    };

    console.log("material:", material);

    if (!material.fileUrl) {
      return res.status(404).json({ message: "הקישור לא נמצא" });
    }

    const response = await fetch(material.fileUrl);
    if (!response.ok || !response.body) {
      return res.status(500).json({ message: "שגיאה בהורדת הקובץ מהענן" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = material.originalFileName || material.title;
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(fileName)}"`
    );
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );

    res.send(buffer);
  } catch (error) {
    console.error("שגיאה בהורדת הקובץ:", error);
    res.status(500).json({ message: "שגיאה בהורדת הקובץ" });
  }
};
