import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";

@Index("Question_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("character varying", { name: "category" })
  category: string;

  @Column("text", { name: "tips", nullable: true })
  tips: string | null;

  @Column("text", { name: "ai_guidance", nullable: true })
  aiGuidance: string | null;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];
}
