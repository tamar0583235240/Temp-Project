import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("expertise_skills_pkey", ["id"], { unique: true })
@Entity("expertise_skills", { schema: "public" })
export class ExpertiseSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("varchar", { length: 50 })
  category: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 20, nullable: true })
  level: string | null;

  @Column("boolean", { name: "is_public", default: () => "true" })
  isPublic: boolean;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}