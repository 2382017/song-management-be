import { Injectable } from '@nestjs/common';
import { Ulasan } from './ulasan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UlasanService {
  constructor(
    @InjectRepository(Ulasan) private ulasanRepository: Repository<Ulasan>,
  ) {}

  async save(ulasan: Ulasan): Promise<Ulasan> {
    return this.ulasanRepository.save(ulasan);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Ulasan[]> {
    return await this.ulasanRepository.find({
      where: { user_id: userId },
      relations: ['song', 'song.category'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findBySongId(
    songId: number,
    page: number,
    limit: number,
  ): Promise<Ulasan[]> {
    return await this.ulasanRepository.find({
      where: { song_id: songId },
      relations: ['song', 'song.category'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndUlasanId(userId: number, ulasanId: number): Promise<Ulasan> {
    const ulasan = await this.ulasanRepository.findOne({
      where: {
        user_id: userId,
        id: ulasanId,
      },
      relations: ['song', 'song.category'],
    });
    if (!ulasan) {
      return new Ulasan();
    }
    return ulasan;
  }

  async deleteById(ulasanId: number) {
    await this.ulasanRepository.delete({ id: ulasanId });
  }
}