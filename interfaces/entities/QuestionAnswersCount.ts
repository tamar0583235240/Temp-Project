import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Questions } from "./Questions";

@Index("question_answers_count_pkey", ["questionId"], { unique: true })
@Entity("question_answers_count", { schema: "public" })
export class QuestionAnswersCount {
  @Column("uuid", { primary: true, name: "question_id" })
  questionId: string;

  @Column("integer", { name: "answers_count", default: () => "0" })
  answersCount: number;

  @OneToOne(() => Questions, (questions) => questions.questionAnswersCount)
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: Questions;
}
