export type Resource = {
  id: number;
  title: string;
  type: eType;
  description: string;
  fileUrl: string;    // URL של הקובץ עצמו (PDF / Word / אודיו)
  createdAt: Date;   // שם הקובץ להצגה
};
export enum eType{pdf,text,link};
