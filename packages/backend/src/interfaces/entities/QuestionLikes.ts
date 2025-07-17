import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PracticeQuestions } from "./PracticeQuestions";

@Index("question_likes_pkey", ["id"], { unique: true })
@Index("question_likes_user_id_question_id_key", ["questionId", "userId"], {
  unique: true,
})
@Entity("question_likes", { schema: "public" })
export class QuestionLikes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("uuid", { name: "question_id", unique: true })
  questionId: string;

  @Column("boolean", { name: "liked" })
  liked: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => PracticeQuestions,
    (practiceQuestions) => practiceQuestions.questionLikes,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: PracticeQuestions;
}
