import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: '2021-10-01T00:00:00.000Z',
  })
  @IsDateString()
  from: Date;

  @ApiProperty({
    example: '2021-10-01T00:00:00.000Z',
  })
  @IsDateString()
  to: Date;

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
