import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Event } from 'src/timetable/dto/event.dto';
import * as specializations from './data/specializations.json';
import { Cron } from '@nestjs/schedule';
const ical = require('node-ical');
const fs = require('node:fs');
const util = require('node:util');

@Injectable()
export class TimeTableService implements OnModuleInit {
  private readonly logger = new Logger(TimeTableService.name);
  private readonly ICAL_URL = 'https://hwrical.zrgr.pw/%s/%s/%s/';
  private events: Event[] = [];
  private roomTimeTable = new Map<string, Event[]>();

  constructor() {}
  async onModuleInit() {
    if (
      !fs.existsSync('./cache/timetable') ||
      !fs.lstatSync('./cache/timetable').isDirectory()
    ) {
      fs.mkdirSync('./cache/timetable', { recursive: true });
    }

    await this.getEvents();
    this.logger.log(JSON.stringify(this.roomTimeTable));
  }

  public getEventsFromRoom(id: string): Event[] {
    console.log(this.roomTimeTable.keys());
    return this.roomTimeTable.get(id);
  }

  private filterEvent(event: any): boolean {
    return (
      event.start === undefined ||
      event.end === undefined ||
      event.summary === undefined
    );
  }

  private formatEvents(events: any[], course: string): Event[] {
    const formated = [];
    const roomPattern = /\[.*\: (.*) (\(.*\))?\]/;

    for (const element of events) {
      const event: any = element;

      if (this.filterEvent(event)) {
        continue;
      }

      let room = undefined;
      if (roomPattern.test(event.summary)) {
        const result = event.summary.match(roomPattern);
        room = result[1].replace('.', '');
      }

      formated.push({
        uid: event.uid,
        course,
        start: event.start,
        end: event.end,
        room: room,
        summary: event.summary,
      });
    }

    return formated;
  }

  @Cron('0 * * * *')
  private async getEvents() {
    this.roomTimeTable.clear();
    try {
      specializations.forEach((spec) => {
        this.logger.log('Looking for courses of ' + spec.name);
        spec.courses.forEach(async (course) => {
          const split = course.split(' - ', 2);
          const url = util.format(this.ICAL_URL, spec.name, split[0], split[1]);

          const events = await this.fetchEvents(url, course);

          events.forEach((event) => {
            if (event.room) {
              const roomEvents = this.roomTimeTable.get(event.room) ?? [];
              roomEvents.push(event);
              this.roomTimeTable.set(event.room, roomEvents);
            }
          });

          fs.writeFileSync(
            util.format('cache/timetable/%s-%s.json', spec.name, course),
            JSON.stringify(events, null, 4),
            { encoding: 'utf8', mode: 0o660, flag: 'w+', flush: true },
          );
        });
      });
    } catch (error) {
      this.logger.error('An error occured while fetching the events: ' + error);
    }
  }

  private async fetchEvents(url: string, course: string): Promise<Event[]> {
    this.logger.log('Fetching events from ' + url);

    let events = await ical.async.fromURL(url);
    events = Object.values(events);
    events = this.formatEvents(events, course);

    this.logger.debug('Fetched ' + events.length + ' events');
    return events;
  }
}
