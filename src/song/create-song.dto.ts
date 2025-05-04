import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  artist: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  imageUrl: string;
}