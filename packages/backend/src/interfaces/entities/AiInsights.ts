import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Answers } from "./Answers";

@Index("AIInsight_pkey", ["id"], { unique: true })
@Entity("ai_insights", { schema: "public" })
export class AiInsights {
  @Column("character varying", { primary: true, name: "id" })
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
