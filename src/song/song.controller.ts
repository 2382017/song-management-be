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
import { CreateSongDTO } from './create-song.dto';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryService } from '../category/category.service';

@Controller('songs')
export class SongController {
  constructor(
    private readonly songService: SongService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(@Req() request: Request, @Body() createSongDTO: CreateSongDTO) {
    const song: Song = new Song();
    const userJwtPayload: JwtPayloadDto = request['user'];

    // Verify that the category exists
    const category = await this.categoryService.findById(createSongDTO.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    song.title = createSongDTO.title;
    song.artist = createSongDTO.artist;
    song.category_id = createSongDTO.categoryId;
    song.image_url = createSongDTO.imageUrl;
    song.user_id = userJwtPayload.sub;
    await this.songService.save(song);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(
    @Req() request: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Song[]> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.songService.findByUserId(userJwtPayload.sub, page, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the song' })
  async findOne(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<Song> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.songService.findByUserIdAndPostId(userJwtPayload.sub, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the song' })
  async updateOne(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() createSongDTO: CreateSongDTO,
  ) {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const song: Song = await this.songService.findByUserIdAndPostId(
      userJwtPayload.sub,
      id,
    );
    if (song.id == null) {
      throw new NotFoundException();
    }

    // Verify that the category exists
    const category = await this.categoryService.findById(createSongDTO.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    song.title = createSongDTO.title;
    song.artist = createSongDTO.artist;
    song.category_id = createSongDTO.categoryId;
    song.image_url = createSongDTO.imageUrl;
    await this.songService.save(song);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the song' })
  async deleteOne(@Req() request: Request, @Param('id') id: number) {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const song: Song = await this.songService.findByUserIdAndPostId(
      userJwtPayload.sub,
      id,
    );
    if (song.id == null) {
      throw new NotFoundException();
    }
    await this.songService.deleteById(id);
  }
}