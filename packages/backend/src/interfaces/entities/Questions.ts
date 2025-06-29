import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";

<<<<<<< HEAD
@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
=======
@Index("Question_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "title" })
>>>>>>> c5a53020e0f4b61e85d00beade7884b0f66120e1
  title: string;

  @Column("text", { name: "content" })
  content: string;

<<<<<<< HEAD
  @Column("text", { name: "category" })
  category: string;

  @Column("text", { name: "tips" })
  tips: string;

  @Column("text", { name: "ai_guidance" })
  aiGuidance: string;
=======
  @Column("character varying", { name: "category" })
  category: string;

  @Column("text", { name: "tips", nullable: true })
  tips: string | null;

  @Column("text", { name: "ai_guidance", nullable: true })
  aiGuidance: string | null;
>>>>>>> c5a53020e0f4b61e85d00beade7884b0f66120e1

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];
}
