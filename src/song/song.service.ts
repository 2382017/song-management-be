import { Injectable } from '@nestjs/common';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  async save(song: Song): Promise<Song> {
    return this.songRepository.save(song);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Song[]> {
    return await this.songRepository.find({
      where: { user_id: userId },
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndPostId(userId: number, songId: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: {
        user_id: userId,
        id: songId,
      },
      relations: ['category'],
    });
    if (!song) {
      return new Song();
    }
    return song;
  }

  async findById(songId: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: { id: songId },
      relations: ['category'],
    });

    if (!song) {
      return new Song();
    }

    return song;
  }

  async deleteById(songId: number) {
    await this.songRepository.delete({ id: songId });
  }
}