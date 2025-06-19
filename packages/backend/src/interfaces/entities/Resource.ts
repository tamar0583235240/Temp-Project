import { Column, Entity, Index } from "typeorm";

@Index("Resource_pkey", ["id"], { unique: true })
@Entity("Resource", { schema: "public" })
export class Resource {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column("text", { name: "title" })
  title!: string;

  @Column("text", { name: "type", nullable: true })
  type!: string | null;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column("text", { name: "fileurl", nullable: true })
  fileurl!: string | null;

  @Column("timestamp without time zone", {
    name: "createdat",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat!: Date;
}
