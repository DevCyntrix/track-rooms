import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: 1731423600,
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    example: 1731427200,
  })
  @IsNumber()
  to: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '6B040',
  })
  @IsString()
  roomKey: string;
}
