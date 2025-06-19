import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Feedback } from "./Feedback";
import { Answers } from "./Answers";
import { Users } from "./Users";

@Index("SharedRecording_pkey", ["id"], { unique: true })
@Entity("shared_recordings", { schema: "public" })
export class SharedRecordings {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "shared_with", array: true })
  sharedWith: string[];

  @OneToMany(() => Feedback, (feedback) => feedback.sharedRecording)
  feedbacks: Feedback[];

  @ManyToOne(() => Answers, (answers) => answers.sharedRecordings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "id" }])
  answer: Answers;

  @ManyToOne(() => Users, (users) => users.sharedRecordings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;
}
