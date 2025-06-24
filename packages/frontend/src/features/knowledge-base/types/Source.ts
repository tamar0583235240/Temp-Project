export type Resource = {
  id: number;
  title: string;
  type: eFileType;
  description: string;
  fileUrl: string;    // URL של הקובץ עצמו (PDF / Word / אודיו)
  createdAt: Date;   // שם הקובץ להצגה
};

export enum eFileType { pdf, text, link };
