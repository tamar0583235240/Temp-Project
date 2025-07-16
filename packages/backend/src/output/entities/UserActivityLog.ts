import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_activity_log_pkey", ["id"], { unique: true })
@Entity("user_activity_log", { schema: "public" })
export class UserActivityLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "event_timestamp",
    nullable: true,
    default: () => "now()",
  })
  eventTimestamp: Date | null;

  @Column("text", { name: "page" })
  page: string;

  @Column("integer", { name: "time_spent_sec", nullable: true })
  timeSpentSec: number | null;
}
