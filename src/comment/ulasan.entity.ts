import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Song } from '../song/song.entity';

@Entity('ulasan')
export class Ulasan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  song_id: number;

  @ManyToOne(() => Song)
  @JoinColumn({ name: 'song_id' })
  song: Song;

  @Column()
  ulasan: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}