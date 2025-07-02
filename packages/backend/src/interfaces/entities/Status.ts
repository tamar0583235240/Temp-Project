import { Column, Entity, Index } from "typeorm";

@Index("status_pkey", ["id"], { unique: true })
@Entity("status", { schema: "public" })

export class Status {
  [x: string]: any;
  @Column("uuid", { name: "user_id" })
  user_id: string;
  @Column("simple-json", { name: "answered" })
  answered: boolean[];
}