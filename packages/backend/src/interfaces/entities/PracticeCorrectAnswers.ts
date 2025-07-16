import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PracticeQuestions } from "./PracticeQuestions";

@Index("practice_correct_answers_pkey", ["id"], { unique: true })
@Entity("practice_correct_answers", { schema: "public" })
export class PracticeCorrectAnswers {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "answer" })
  answer: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => PracticeQuestions,
    (practiceQuestions) => practiceQuestions.practiceCorrectAnswers,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: PracticeQuestions;
}
