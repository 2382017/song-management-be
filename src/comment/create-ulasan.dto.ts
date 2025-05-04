import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUlasanDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  songId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ulasan: string;
}