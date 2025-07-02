import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AiInsight } from "./AiInsight";
import { Question } from "./Question";
import { User } from "./User";
import { SharedRecording } from "./SharedRecording";

@Index("Answer_pkey", ["id"], { unique: true })
@Entity("Answer", { schema: "public" })
export class Answer {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "fileurl", nullable: true })
  fileurl: string | null;

  @Column("timestamp without time zone", {
    name: "submittedat",
    default: () => "CURRENT_TIMESTAMP",
  })
  submittedat: Date;

  @OneToMany(() => AiInsight, (aiInsight) => aiInsight.answer)
  aiInsights: AiInsight[];

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn([{ name: "questionid", referencedColumnName: "id" }])
  question: Question;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => SharedRecording, (sharedRecording) => sharedRecording.answer)
  sharedRecordings: SharedRecording[];
}