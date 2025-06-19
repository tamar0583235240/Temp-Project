import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answer } from "./Answer";
import { Feedback } from "./Feedback";
import { SharedRecording } from "./SharedRecording";

@Index("User_email_key", ["email"], { unique: true })
@Index("User_pkey", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column("text", { name: "firstname" })
  firstname!: string;

  @Column("text", { name: "lastname" })
  lastname!: string;

  @Column("text", { name: "email", unique: true })
  email!: string;

  @Column("text", { name: "phone", nullable: true })
  phone!: string | null;

  @Column("text", { name: "role", nullable: true })
  role!: string | null;

  @Column("timestamp without time zone", {
    name: "createdat",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat!: Date;

  @Column("boolean", { name: "isactive", default: () => "true" })
  isactive!: boolean;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers!: Answer[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenbyuser)
  feedbacks!: Feedback[];

  @OneToMany(() => SharedRecording, (sharedRecording) => sharedRecording.owner)
  sharedRecordings!: SharedRecording[];
}
