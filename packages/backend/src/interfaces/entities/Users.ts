import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { SharedRecordings } from "./SharedRecordings";

@Index("User_email_key", ["email"], { unique: true })
@Index("User_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "first_name" })
  firstName: string;

  @Column("character varying", { name: "last_name" })
  lastName: string;

  @Column("character varying", { name: "email", unique: true })
  email: string;

  @Column("character varying", { name: "phone", nullable: true })
  phone: string | null;

  @Column("character varying", { name: "role" })
  role: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @Column("text", { name: "password", nullable: true })
  password: string | null;

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(
    () => PasswordResetTokens,
    (passwordResetTokens) => passwordResetTokens.user
  )
  passwordResetTokens: PasswordResetTokens[];

  @OneToMany(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.owner
  )
  sharedRecordings: SharedRecordings[];
}
