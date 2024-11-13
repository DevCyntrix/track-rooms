import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

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
    example: 1,
  })
  @IsNumber()
  roomId: number;
}
