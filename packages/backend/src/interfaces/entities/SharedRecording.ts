import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Feedback } from "./Feedback";
import { Answer } from "./Answer";
import { User } from "./User";

@Index("SharedRecording_pkey", ["id"], { unique: true })
@Entity("SharedRecording", { schema: "public" })
export class SharedRecording {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "sharedwith", nullable: true, array: true })
  sharedwith: string[] | null;

  @OneToMany(() => Feedback, (feedback) => feedback.sharedrecording)
  feedbacks: Feedback[];

  @ManyToOne(() => Answer, (answer) => answer.sharedRecordings)
  @JoinColumn([{ name: "answerid", referencedColumnName: "id" }])
  answer: Answer;

  @ManyToOne(() => User, (user) => user.sharedRecordings)
  @JoinColumn([{ name: "ownerid", referencedColumnName: "id" }])
  owner: User;
}
