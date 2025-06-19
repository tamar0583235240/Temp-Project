import { Column, Entity, Index } from "typeorm";

@Index("Resource_pkey", ["id"], { unique: true })
@Entity("resources", { schema: "public" })
export class Resources {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "type" })
  type: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;
}
