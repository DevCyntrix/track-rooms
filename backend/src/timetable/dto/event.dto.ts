import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Event {

  @ApiProperty({
    example: 'sked.de1118764',
  })
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  course: string;

  @ApiProperty({
    example: '2024-12-20T08:00:00.000Z',
  })
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    example: '2024-12-20T10:00:00.000Z',
  })
  @IsString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({
    example: '6B040',
  })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({
    example: 'Klausur: Wpff. I: Artificial Intelligence/Künstliche [CL: 5.0002]',
  })
  @IsString()
  @IsNotEmpty()
  summary: string;
}
