import { Column, Entity, Index, OneToMany } from "typeorm";
import { ContentReports } from "./ContentReports";
import { ExperienceThanks } from "./ExperienceThanks";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { SharedRecordings } from "./SharedRecordings";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { Resources } from "./Resources";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "first_name" })
  firstName: string;

  @Column("text", { name: "last_name" })
  lastName: string;

  @Column("text", { name: "email", unique: true })
  email: string;

<<<<<<< HEAD
=======
  @Column("text", { name: "password" })
  password: string;

>>>>>>> newTaskG4
  @Column("text", { name: "phone", nullable: true })
  phone: string | null;

  @Column("text", { name: "role" })
  role: string;

  @Column("timestamp without time zone", {
    name: "created_at",
<<<<<<< HEAD
    default: () => "now()",
=======
    default: () => "CURRENT_TIMESTAMP",
>>>>>>> newTaskG4
  })
  createdAt: Date;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

<<<<<<< HEAD
  @Column("text", { name: "password", nullable: true })
  password: string | null;

  // @OneToMany(() => ContentReports, (contentReports) => contentReports.user)
  // contentReports: ContentReports[];

  // @OneToMany(
  //   () => ExperienceThanks,
  //   (experienceThanks) => experienceThanks.user
  // )
  // experienceThanks: ExperienceThanks[];

  @OneToMany(
    () => PasswordResetTokens,
    (passwordResetTokens) => passwordResetTokens.user
  )
  
  passwordResetTokens: PasswordResetTokens[];
=======
>>>>>>> newTaskG4
  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(() => Resources, (resources) => resources)
  resources: Resources[];

  @OneToMany(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.owner
  )
  sharedRecordings: SharedRecordings[];
}