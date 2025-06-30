import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Answers } from "./Answers";

@Index("ai_insights_pkey", ["id"], { unique: true })
@Entity("ai_insights", { schema: "public" })
export class AiInsights {
  @Column("uuid", { primary: true, name: "id" })
e0f4b61e85d00beade7884b0f66120e1
  id: string;

  @Column("text", { name: "summary" })
  summary: string;

  @Column("integer", { name: "rating" })
  rating: number;

  @Column("text", { name: "strengths", nullable: true })
  strengths: string | null;

  @Column("text", { name: "improvements", nullable: true })
  improvements: string | null;

  @ManyToOne(() => Answers, (answers) => answers.aiInsights, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "id" }])
  answer: Answers;
}
