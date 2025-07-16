import { Column, Entity, Index } from "typeorm";

@Index("tips_pkey", ["id"], { unique: true })
@Index("idx_tips_sequence", ["sequenceNumber"], {})
@Index("tips_sequence_number_key", ["sequenceNumber"], { unique: true })
@Entity("tips", { schema: "public" })
export class Tips {
  @Column("uuid", {
    primary: true,
    name: "id",
<<<<<<< HEAD
    default: () => "uuid_generate_v4()",
=======
    default: () => "gen_random_uuid()",
>>>>>>> 9ee6ca6e47c755277c384223ec4b4383c5e40441
  })
  id: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("integer", { name: "sequence_number", unique: true })
  sequenceNumber: number;
}
