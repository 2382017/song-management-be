import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { CreateUlasanDTO } from './create-ulasan.dto';
import { UlasanService } from './ulasan.service';
import { Ulasan } from './ulasan.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { SongService } from '../song/song.service';

@Controller('ulasan')
export class UlasanController {
  constructor(
    private readonly ulasanService: UlasanService,
    private readonly songService: SongService,
  ) {}

  @Post()
  async create(@Req() request: Request, @Body() createUlasanDTO: CreateUlasanDTO) {
    const ulasan: Ulasan = new Ulasan();
    const userJwtPayload: JwtPayloadDto = request['user'];

    // Verify that the song exists
    const song = await this.songService.findById(createUlasanDTO.songId);
    if (!song) {
      throw new NotFoundException('Song not found');
    }

    ulasan.song_id = createUlasanDTO.songId;
    ulasan.ulasan = createUlasanDTO.ulasan;
    ulasan.user_id = userJwtPayload.sub;
    await this.ulasanService.save(ulasan);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(
    @Req() request: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Ulasan[]> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.ulasanService.findByUserId(userJwtPayload.sub, page, limit);
  }

  @Get('song/:songId')
  @ApiParam({ name: 'songId', type: Number, description: 'ID of the song' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findBySongId(
    @Param('songId') songId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Ulasan[]> {
    return await this.ulasanService.findBySongId(songId, page, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the ulasan' })
  async findOne(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<Ulasan> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.ulasanService.findByUserIdAndUlasanId(userJwtPayload.sub, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the ulasan' })
  async updateOne(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() createUlasanDTO: CreateUlasanDTO,
  ) {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const ulasan: Ulasan = await this.ulasanService.findByUserIdAndUlasanId(
      userJwtPayload.sub,
      id,
    );
    if (ulasan.id == null) {
      throw new NotFoundException();
    }

    // Verify that the song exists
    const song = await this.songService.findById(createUlasanDTO.songId);
    if (!song) {
      throw new NotFoundException('Song not found');
    }

    ulasan.song_id = createUlasanDTO.songId;
    ulasan.ulasan = createUlasanDTO.ulasan;
    await this.ulasanService.save(ulasan);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the ulasan' })
  async deleteOne(@Req() request: Request, @Param('id') id: number) {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const ulasan: Ulasan = await this.ulasanService.findByUserIdAndUlasanId(
      userJwtPayload.sub,
      id,
    );
    if (ulasan.id == null) {
      throw new NotFoundException();
    }
    await this.ulasanService.deleteById(id);
  }
}