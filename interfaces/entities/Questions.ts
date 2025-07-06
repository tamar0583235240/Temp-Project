import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Answers } from "./Answers";
import { Categories } from "./Categories";

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "category" })
  category: string;

  @Column("text", { name: "tips" })
  tips: string;

  @Column("text", { name: "ai_guidance" })
  aiGuidance: string;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @Column("jsonb", { name: "options", nullable: true })
  options: object | null;

  @Column("text", { name: "question_type", nullable: true })
  questionType: string | null;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];

  @ManyToOne(() => Categories, (categories) => categories.questions)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category_2: Categories;
}
