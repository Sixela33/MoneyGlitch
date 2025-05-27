import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatisticsSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  totalTradesScanned: number;

  @Column('int')
  totalTradesExecuted: number;

  @Column('int')
  totalTradesFailed: number;

  @Column('decimal', { precision: 18, scale: 8 })
  totalProfitInSol: number;

  @Column('decimal', { precision: 5, scale: 2 })
  successRate: number;

  @Column({ type: 'varchar', length: 50 })
  snapshotType: string; // 'hourly', 'daily', 'session_start', 'session_end'

  @CreateDateColumn()
  createdAt: Date;
} 