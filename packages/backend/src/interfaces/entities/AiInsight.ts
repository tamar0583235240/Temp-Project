import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Answer } from "./Answer";

@Index("AIInsight_pkey", ["id"], { unique: true })
@Entity("AIInsight", { schema: "public" })
export class AiInsight {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column("text", { name: "summary", nullable: true })
  summary!: string | null;

  @Column("integer", { name: "rating", nullable: true })
  rating!: number | null;

  @Column("text", { name: "strengths", nullable: true })
  strengths!: string | null;

  @Column("text", { name: "improvements", nullable: true })
  improvements!: string | null;

  @ManyToOne(() => Answer, (answer) => answer.aiInsights)
  @JoinColumn([{ name: "answerid", referencedColumnName: "id" }])
  answer!: Answer;
}
