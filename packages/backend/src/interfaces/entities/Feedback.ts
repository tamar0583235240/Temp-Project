import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { SharedRecording } from "./SharedRecording";

@Index("Feedback_pkey", ["id"], { unique: true })
@Entity("Feedback", { schema: "public" })
export class Feedback {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column("text", { name: "comment" })
  comment!: string;

  @Column("integer", { name: "rating", nullable: true })
  rating!: number | null;

  @Column("timestamp without time zone", {
    name: "createdat",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat!: Date;

  @ManyToOne(() => User, (user) => user.feedbacks)
  @JoinColumn([{ name: "givenbyuserid", referencedColumnName: "id" }])
  givenbyuser!: User;

  @ManyToOne(
    () => SharedRecording,
    (sharedRecording) => sharedRecording.feedbacks
  )
  @JoinColumn([{ name: "sharedrecordingid", referencedColumnName: "id" }])
  sharedrecording!: SharedRecording;
}
