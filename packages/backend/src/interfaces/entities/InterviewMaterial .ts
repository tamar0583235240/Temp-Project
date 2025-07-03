import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('interview_materials_sub')
export class InterviewMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  short_description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  file_url: string;
}
