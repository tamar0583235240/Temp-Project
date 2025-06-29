import { Column, Entity, Index } from "typeorm";

@Index("status_pkey", ["id"], { unique: true })
@Entity("status", { schema: "public" })
export class Status {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("boolean", { name: "content" })
  answered: boolean[];
}
