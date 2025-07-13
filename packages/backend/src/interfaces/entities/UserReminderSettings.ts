import { Users } from "./Users";
import { Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";

@Index("user_reminder_settings_pkey", ["id"], { unique: true })
@Index("user_reminder_settings_user_id_type_key", ["type", "userId"], {
  unique: true,
})
@Entity("user_reminder_settings", { schema: "public" })
export class UserReminderSettings {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @ManyToOne(() => Users, (user) => user.userReminderSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column("enum", {
    name: "type",
    enum: ["daily", "weekly", "custom"],
  })
  type: "daily" | "weekly" | "custom";

  @Column("enum", { name: "frequency", enum: ["once", "repeating"] })
  frequency: "once" | "repeating";

  @Column("boolean", { name: "is_enabled", default: () => "true" })
  isEnabled: boolean;

  @Column("integer", { name: "last_seen_sequence", nullable: true })
  lastSeenSequence: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;
}
