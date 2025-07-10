import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Users } from "./Users";

@Entity("profiles", { schema: "public" })
@Unique(["userId"])
export class Profiles {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column("text", { name: "full_name" })
  fullName: string;

  @Column("text", { name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column("text", { name: "location", nullable: true })
  location: string | null;

  @Column("jsonb", { name: "external_links", nullable: true })
  externalLinks: any;

  @Column("text", {
    name: "status",
    default: () => "'Available'",
  })
  status: "Available" | "Not Available";

  @Column("text", {
    name: "preferred_job_type",
    default: () => "'Any'",
  })
  preferredJobType: "Full-time" | "Part-time" | "Freelance" | "Internship" | "Any";

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("timestamp", {
    name: "is_public",
    default: () => false,
  })
  isPublic: boolean;
}
