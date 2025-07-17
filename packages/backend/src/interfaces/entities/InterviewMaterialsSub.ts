import { Column, Entity, Index } from "typeorm";

@Index("interview_materials_sub_pkey", ["id"], { unique: true })
@Entity("interview_materials_sub", { schema: "public" })
export class InterviewMaterialsSub {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title", nullable: true })
  title: string | null;

  @Column("text", { name: "thumbnail", nullable: true })
  thumbnail: string | null;

  @Column("text", { name: "short_description", nullable: true })
  shortDescription: string | null;

  @Column("text", { name: "file_url", nullable: true })
  fileUrl: string | null;

  @Column("integer", { name: "downloads_count", nullable: true })
  downloadsCount: number | null;

  @Column("text", { name: "original_file_name", nullable: true })
  originalFileName: string | null;
}
