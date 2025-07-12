import { Request, Response } from "express";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../config/cloudinary";
import * as interviewMaterialSubRepository from "../repository/interviewMaterialSubRepository";

const getInterviewMaterialSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items =
      await interviewMaterialSubRepository.getInterviewMaterialsSubs();
    const itemsWithUrls = items.map((item) => ({
      ...item,
      thumbnailUrl: item.thumbnail || null,
      fileUrl: item.fileUrl || null,
      originalFileName: item.originalFileName || null,
    }));
    res.status(200).json(itemsWithUrls);
  } catch (error) {
    console.error("Error in interview material sub controller:", error);
    res.status(500).json({ error });
  }
};

// 🟢 יצירת חומר ריאיון חדש
const addInterviewMaterialSub = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const thumbnailFile = files?.thumbnail?.[0];
    const file = files?.file?.[0];
    const originalFileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    
    if (!file) {
      res.status(400).json({ message: "לא הועלה קובץ" });
      return;
    }

    let thumbnailUrl = "";
    if (thumbnailFile) {
      const thumbnailResult = await uploadFileToCloudinary(
        thumbnailFile,
        "interviewMaterialsHub/thumbnails"
      );
      thumbnailUrl = thumbnailResult.secure_url;
    }

    const fileResult = await uploadFileToCloudinary(
      file,
      "interviewMaterialsHub/files"
    );

    const created =
      await interviewMaterialSubRepository.createInterviewMaterialSub(
        req.body.title,
        thumbnailUrl,
        req.body.short_description,
        fileResult.secure_url,
        originalFileName
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
const updateInterviewMaterialSub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, short_description } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    const existingMaterial =
      await interviewMaterialSubRepository.getInterviewMaterialSubById(id);
    if (!existingMaterial) {
      res.status(404).json({ message: "חומר ריאיון לא נמצא" });
      return;
    }

    let updatedThumbnail = existingMaterial.thumbnail;
    let updatedFileUrl = existingMaterial.fileUrl;
    let updatedOriginalFileName = existingMaterial.originalFileName;

    const extractPublicId = (url?: string | null) => {
      if (typeof url !== "string") return null;
      const match = url.match(
        /\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|pdf|mp4|webm|svg|gif)$/
      );
      return match?.[1];
    };

    if (files?.thumbnail?.[0]) {
      const publicId = extractPublicId(existingMaterial.thumbnail);
      if (publicId)
        await deleteFileFromCloudinary(
          `interviewMaterialsHub/thumbnails/${publicId}`
        );
      const thumbUpload = await uploadFileToCloudinary(
        files.thumbnail[0],
        "interviewMaterialsHub/thumbnails"
      );
      updatedThumbnail = thumbUpload.secure_url;
    }

    if (files?.file?.[0]) {
      const publicId = extractPublicId(existingMaterial.fileUrl);
      if (publicId)
        await deleteFileFromCloudinary(
          `interviewMaterialsHub/files/${publicId}`
        );
      const fileUpload = await uploadFileToCloudinary(
        files.file[0],
        "interviewMaterialsHub/files"
      );
      updatedFileUrl = fileUpload.secure_url;
      updatedOriginalFileName = files.file[0].originalname;
    }

    const updated =
      await interviewMaterialSubRepository.updateInterviewMaterialSub(
        id,
        title || existingMaterial.title,
        short_description || existingMaterial.shortDescription,
        updatedThumbnail ?? existingMaterial.thumbnail ?? "",
        updatedFileUrl ?? existingMaterial.fileUrl ?? "",
        updatedOriginalFileName ?? existingMaterial.originalFileName ?? ""
      );

    res.json(updated);
  } catch (error) {
    console.error("Error updating interview material:", error);
    res.status(500).json({ message: "שגיאה בעדכון" });
  }
};
const deleteInterviewMaterialSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const existingMaterialSub =
      await interviewMaterialSubRepository.getInterviewMaterialSubById(id);
    if (!existingMaterialSub) {
      res.status(404).json({ message: "Interview material sub not found" });
      return;
    }

    if (existingMaterialSub.thumbnail) {
      const match = existingMaterialSub.thumbnail.match(
        /\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|pdf|mp4|webm|svg|gif)$/
      );
      if (match && match[1]) {
        await deleteFileFromCloudinary(match[1]);
      }
    }

    if (existingMaterialSub.fileUrl) {
      const match = existingMaterialSub.fileUrl.match(
        /\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|pdf|mp4|webm|svg|gif)$/
      );
      if (match && match[1]) {
        await deleteFileFromCloudinary(match[1]);
      }
    }

    await interviewMaterialSubRepository.deleteInterviewMaterialSub(id);

    res.json({ message: "Interview material sub deleted successfully" });
  } catch (error) {
    console.error("Error in delete interview material sub controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getInterviewMaterialSub,
  updateInterviewMaterialSub,
  addInterviewMaterialSub,
  deleteInterviewMaterialSub,
};
