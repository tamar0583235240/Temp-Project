import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'dynamic_contents' })
export class DynamicContent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  key_name!: string;

  @Column('text')
  content!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
