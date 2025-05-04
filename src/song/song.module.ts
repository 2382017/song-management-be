import { Module } from '@nestjs/common';
import { SongService } from './song.service'; // <-- Ganti nama file & class service
import { SongController } from './song.controller'; // <-- Ganti nama file & class controller
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity'; // <-- Ganti nama file & class entity
import { CategoryModule } from '../category/category.module'; // <-- Ganti nama module terkait

@Module({
  providers: [SongService], // <-- Ganti provider
  imports: [
    TypeOrmModule.forFeature([Song]), // <-- Ganti entity
    CategoryModule // <-- Gunakan module yang sudah diubah namanya
  ],
  controllers: [SongController], // <-- Ganti controller
  exports: [SongService] // <-- Ganti export service
})
export class SongModule {} // <-- Ganti nama class module