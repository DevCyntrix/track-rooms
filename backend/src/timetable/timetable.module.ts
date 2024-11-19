import { Module } from '@nestjs/common';
import { TimeTableService } from './timetable.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [TimeTableService],
})
export class TimeTableModule {}
