import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Users } from "./Users";

@Index("education_entries_pkey", ["id"], { unique: true })
@Entity("education_entries", { schema: "public" })
export class EducationEntry {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @ManyToOne(() => Users, (user) => user.educationEntries, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @Column("text", { name: "institution_name" })
  institutionName: string;

  @Column("text", { name: "degree", nullable: true })
  degree?: string;

  @Column("text", { name: "course_name", nullable: true })
  courseName?: string;

  @Column("text", { name: "field_of_study", nullable: true })
  fieldOfStudy?: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date", nullable: true })
  endDate?: string;

  @Column("boolean", { name: "is_public", default: false })
  isPublic: boolean;

  @Column("timestamp with time zone", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
