import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_activity_log_pkey", ["id"], { unique: true })
@Entity("user_activity_log", { schema: "public" })
export class UserActivityLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "page" })
  page: string;

  @Column("timestamp without time zone", {
    name: "event_timestamp",
    default: () => "now()",
  })
  eventTimestamp: Date;
}
