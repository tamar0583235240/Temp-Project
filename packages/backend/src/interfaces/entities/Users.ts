import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { Resources } from "./Resources";
import { SharedRecordings } from "./SharedRecordings";
import { WorkExperiences } from "./WorkExperiences";
import { UserReminderSettings } from "./UserReminderSettings";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "first_name" })
  first_name: string;

  @Column("text", { name: "last_name" })
  last_name: string;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "phone", nullable: true })
  phone: string | null;

  @Column("text", { name: "role" })
  role: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(() => PasswordResetTokens, (token) => token.user)
  passwordResetTokens: PasswordResetTokens[];

  @OneToMany(() => Resources, (resources) => resources.user)
  resources: Resources[];

  @OneToMany(() => SharedRecordings, (rec) => rec.owner)
  sharedRecordings: SharedRecordings[];

  @OneToMany(() => WorkExperiences, (exp) => exp.user)
  workExperiences: WorkExperiences[];

  @OneToMany(() => UserReminderSettings, (setting) => setting.user)
  userReminderSettings: UserReminderSettings[];
}
