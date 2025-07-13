import { Column, Entity, Index } from "typeorm";

@Index("practice_tasks_pkey", ["id"], { unique: true })
@Entity("practice_tasks", { schema: "public" })
export class PracticeTasks {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", { name: "start_datetime" })
  startDatetime: Date;

  @Column("integer", { name: "duration_minutes" })
  durationMinutes: number;

  @Column("character varying", { name: "category", length: 20 })
  category: string;

  @Column("integer", { name: "reminder_minutes_before", nullable: true })
  reminderMinutesBefore: number | null;

  @Column("character varying", {
    name: "status",
    length: 20,
    default: () => "'pending'",
  })
  status: string;

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
