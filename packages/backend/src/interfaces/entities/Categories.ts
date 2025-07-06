import { Column, Entity, Index, OneToMany } from "typeorm";
import { Questions } from "./Questions";

@Index("categories_pkey", ["id"], { unique: true })
@Entity("categories", { schema: "public" })
export class Categories {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @OneToMany(() => Questions, (questions) => questions.category_2)
  questions: Questions[];
}
