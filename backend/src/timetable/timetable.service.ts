import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Event } from 'src/timetable/dto/event.dto'
import * as specializations from './data/specializations.json';
const ical = require('node-ical');
const fs = require("node:fs");
const util = require("node:util");

@Injectable()
export class TimeTableService {

  private readonly logger = new Logger(TimeTableService.name);
  private readonly ICAL_URL = "https://hwrical.zrgr.pw/%s/%s/%s/";
  private events: Event[] = [];

  constructor() {
    // if (!fs.existsSync("./cache/timetable") || !fs.lstatSync("./cache/timetable").isDirectory()) {
    //   fs.mkdirSync("./cache/timetable", { recurvise: true })
    // }

    // this.getEvents();
  }

  private filterEvent(event: any): boolean {
    return event.start === undefined ||
      event.end === undefined ||
      event.summary === undefined;
  }

  private formatEvents(events: any[]): Event[] {
    const formated = [];
    let roomPattern = /\[.*\: (.*)\]/;


    for (const element of events) {
      const event: any = element;

      if (this.filterEvent(event)) {
        continue;
      }

      this.logger.log(event.summary);
      let room = undefined;
      if (roomPattern.test(event.summary)) {
        let result = event.summary.match(roomPattern);
        console.log(result);
        room = result[1].replace('.', '');
      }

      formated.push({
        uid: event.uid,
        start: event.start,
        end: event.end,
        room: room,
        summary: event.summary,
      });
    }

    return formated;
  }

  // @Cron('* * * * *')
  private async getEvents() {
    try {
      specializations.forEach((spec) => {
        this.logger.log('Looking for courses of ' + spec.name);
        spec.courses.forEach(async (course) => {
          let split = course.split(" - ", 2);
          let url = util.format(this.ICAL_URL, spec.name, split[0], split[1])

          let events = await this.fetchEvents(url);
          fs.writeFileSync(
            util.format("cache/timetable/%s-%s.json", spec.name, course),
            JSON.stringify(events, null, 4),
            { encoding: 'utf8', mode: 0o660, flag: 'w+', flush: true }
          );
          this.logger.log(url)
        });
      });
    } catch (error) {
      this.logger.error('An error occured while fetching the events: ' + error);
    }
  }

  private async fetchEvents(url: string): Promise<Event[]> {
    this.logger.log('Fetching events from ' + url);

    let events = await ical.async.fromURL(url);
    events = Object.values(events);
    events = this.formatEvents(events);

    this.logger.debug('Fetched ' + events.length + ' events');
    return events;
  }
}
