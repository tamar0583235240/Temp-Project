import { Column, Entity, Index } from "typeorm";

@Index("profiles_pkey", ["id"], { unique: true })
@Entity("profiles", { schema: "public" })
export class Profiles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "full_name" })
  fullName: string;

  @Column("text", { name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column("text", { name: "location", nullable: true })
  location: string | null;

  @Column("jsonb", { name: "external_links", nullable: true })
  externalLinks: object | null;

  @Column("text", {
    name: "status",
    nullable: true,
    default: () => "'Available'",
  })
  status: string | null;

  @Column("text", {
    name: "preferred_job_type",
    nullable: true,
    default: () => "'Any'",
  })
  preferredJobType: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;
}
