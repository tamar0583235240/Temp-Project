import { Column, Entity, Index, OneToMany } from "typeorm";
<<<<<<< HEAD
import { ContentReports } from "./ContentReports";
import { ExperienceThanks } from "./ExperienceThanks";
import { InterviewExperiences } from "./InterviewExperiences";
=======
>>>>>>> Activity-Monitoring
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { SharedRecordings } from "./SharedRecordings";
<<<<<<< HEAD
import { UserReminderSettings } from "./UserReminderSettings";
import { WorkExperiences } from "./WorkExperiences";
=======
>>>>>>> Activity-Monitoring

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

  @Column("text", { name: "phone", nullable: true })
  phone: string | null;

  @Column("text", { name: "role" })
  role: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @Column("text", { name: "password", nullable: true })
  password: string | null;

<<<<<<< HEAD
  @OneToMany(() => ContentReports, (contentReports) => contentReports.user)
  contentReports: ContentReports[];

  @OneToMany(
    () => ExperienceThanks,
    (experienceThanks) => experienceThanks.user
  )
  experienceThanks: ExperienceThanks[];

  @OneToMany(
    () => InterviewExperiences,
    (interviewExperiences) => interviewExperiences.user
  )
  interviewExperiences: InterviewExperiences[];

=======
>>>>>>> Activity-Monitoring
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
<<<<<<< HEAD

  @OneToMany(
    () => UserReminderSettings,
    (userReminderSettings) => userReminderSettings.user
  )
  userReminderSettings: UserReminderSettings[];

  @OneToMany(() => WorkExperiences, (workExperiences) => workExperiences.user)
  workExperiences: WorkExperiences[];
=======
>>>>>>> Activity-Monitoring
}
