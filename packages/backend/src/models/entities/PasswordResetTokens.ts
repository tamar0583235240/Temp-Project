import { Column, Entity, Index } from "typeorm";

@Index("password_reset_tokens_pkey", ["id", "token"], { unique: true })
@Entity("password_reset_tokens", { schema: "public" })
export class PasswordResetTokens {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("text", { primary: true, name: "token" })
  token: string;

  @Column("date", { name: "expires_at", nullable: true })
  expiresAt: string | null;
}
