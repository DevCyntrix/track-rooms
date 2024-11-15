import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: '6B040',
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    example: 'B',
  })
  @IsString()
  @IsNotEmpty()
  building: string;

  @ApiProperty({
    example: '0',
  })
  @IsString()
  @IsNotEmpty()
  floor: string;
}
