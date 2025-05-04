import { Module } from '@nestjs/common';
import { UlasanController } from './ulasan.controller';
import { UlasanService } from './ulasan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ulasan } from './ulasan.entity';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ulasan]),
    SongModule,
  ],
  controllers: [UlasanController],
  providers: [UlasanService],
})
export class UlasanModule {}