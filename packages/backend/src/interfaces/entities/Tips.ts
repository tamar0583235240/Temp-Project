import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export type TipType = 'practice' | 'practical';

@Entity('tips')
export class Tip extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // תוכן הטיפ
  @Column('text')
  content: string;

  // סוג הטיפ – מקצועי או פרקטי
  @Column({ type: 'varchar', length: 50 })
  type: TipType;

  // האם פעיל – ניתן להשבית טיפים
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // תאריך יצירה
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // תאריך עדכון אחרון
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
