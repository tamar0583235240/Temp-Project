import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answer } from "./Answer";

@Index("Question_pkey", ["id"], { unique: true })
@Entity("Question", { schema: "public" })
export class Question {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column("text", { name: "title" })
  title!: string;

  @Column("text", { name: "content" })
  content!: string;

  @Column("text", { name: "category" })
  category!: string;

  @Column("text", { name: "tips", nullable: true })
  tips!: string | null;

  @Column("text", { name: "aiguidance", nullable: true })
  aiguidance!: string | null;

  @Column("boolean", { name: "isactive", default: () => "true" })
  isactive!: boolean;

  @Column("text", { name: "options", nullable: true, array: true })
  options!: string[] | null;

  @Column("character varying", {
    name: "question_type",
    nullable: true,
    length: 10,
    default: () => "'open'",
  })
  question_type!: string | null;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[];
}
