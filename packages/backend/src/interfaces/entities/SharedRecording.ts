import { Column, Entity, Index, OneToMany } from "typeorm";
import { Feedbacktype } from "./Feedbacktype";

@Index("shared_recording_pkey", ["id"], { unique: true })
@Entity("shared_recording", { schema: "public" })
export class SharedRecording {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "username", nullable: true })
  username: string | null;

  @Column("text", { name: "questiontitle", nullable: true })
  questiontitle: string | null;

  @Column("timestamp without time zone", { name: "date", nullable: true })
  date: Date | null;

  @Column("text", { name: "audiourl", nullable: true })
  audiourl: string | null;

  @Column("text", { name: "aisummary", nullable: true })
  aisummary: string | null;

  @Column("text", { name: "sharedwith", nullable: true, array: true })
  sharedwith: string[] | null;

  @OneToMany(() => Feedbacktype, (feedbacktype) => feedbacktype.sharedRecording)
  feedbacktypes: Feedbacktype[];
}
