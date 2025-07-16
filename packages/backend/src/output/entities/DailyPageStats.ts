import { Column, Entity, Index } from "typeorm";

@Index("daily_page_stats_pkey", ["date"], { unique: true })
@Entity("daily_page_stats", { schema: "public" })
export class DailyPageStats {
  @Column("date", { primary: true, name: "date" })
  date: string;

  @Column("integer", {
    name: "home_minutes",
    nullable: true,
    default: () => "0",
  })
  homeMinutes: number | null;

  @Column("integer", {
    name: "dashboard_minutes",
    nullable: true,
    default: () => "0",
  })
  dashboardMinutes: number | null;

  @Column("integer", {
    name: "about_minutes",
    nullable: true,
    default: () => "0",
  })
  aboutMinutes: number | null;

  @Column("integer", {
    name: "contact_minutes",
    nullable: true,
    default: () => "0",
  })
  contactMinutes: number | null;
}
