import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { isPlatformBrowser } from '@angular/common';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { ActivatedRoute } from '@angular/router';
import { BookingModel, RoomBookingsModel } from '../types';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})

export class TimetableComponent implements OnInit {
  roomKey: string = "";
  date: Date = new Date();
  calendarOptions: CalendarOptions | undefined = undefined;
  roomBookings: RoomBookingsModel = {
    key: "",
    building: "",
    floor: "",
    bookings: []
  };
  bookings: BookingModel[] = [];
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.roomKey = params['roomKey'] || '';
      this.date = params['date'] ? new Date(params['date']) : new Date();

      if (this.roomKey) {
        this.loadTimetable();
      } else {
        console.error('Missing roomKey in query params');
      }
    });
  }

  loadTimetable() {
    this.locationService.getBookingsByRoom(this.roomKey).subscribe({
      next: (data) => {
        this.roomBookings = data;
        this.bookings = data.bookings;

        const filteredBookings = this.filterBookingsByDate(this.bookings, this.date);

        const { slotMinTime, slotMaxTime } = this.calculateTimeRange(filteredBookings);

        const events = this.transformBookingsToEvents(filteredBookings);

        this.calendarOptions = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'timeGridDay',
          initialDate: this.date,
          events: events,
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: '',
          },
          datesSet: this.onDateChange.bind(this),
          allDaySlot: false ,
          slotMinTime: slotMinTime,
          slotMaxTime: slotMaxTime,
          height: 'auto'
        };
      },
      error: (error) => {
        console.error('Error while fetching room bookings:', error);
      },
    });
  }

  filterBookingsByDate(bookings: BookingModel[], date: Date): BookingModel[] {
    const selectedDate = date.toDateString();
    return bookings.filter((booking) => {
      const fromDate = new Date(booking.from * 1000);
      return fromDate.toDateString() === selectedDate;
    });
  }

  transformBookingsToEvents(bookings: BookingModel[]): EventInput[] {
    return bookings.map((booking) => {
      return {
        title: booking.name,
        start: new Date(booking.from * 1000).toISOString(),
        end: new Date(booking.to * 1000).toISOString(),
      };
    });
  }

  onDateChange(arg: any) {
    this.date = new Date(arg.start);
    const filteredBookings = this.filterBookingsByDate(this.bookings, this.date);
    const events = this.transformBookingsToEvents(filteredBookings);

    if (this.calendarOptions) {
      this.calendarOptions.events = events;
    }

    const { slotMinTime, slotMaxTime } = this.calculateTimeRange(filteredBookings);
    this.calendarOptions!.slotMinTime = slotMinTime;
    this.calendarOptions!.slotMaxTime = slotMaxTime;
  }

  calculateTimeRange(bookings: BookingModel[]): { slotMinTime: string; slotMaxTime: string } {
    if (bookings.length === 0) {
      return { slotMinTime: '08:00:00', slotMaxTime: '18:00:00' };
    }
  
    const times = bookings.flatMap((booking) => [booking.from * 1000, booking.to * 1000]);
  
    const earliestTime = Math.min(...times);
    const latestTime = Math.max(...times);
  
    const bufferMillis = 2 * 60 * 60 * 1000;
  
    const slotMinTimeDate = new Date(earliestTime - bufferMillis);
    const slotMaxTimeDate = new Date(latestTime + bufferMillis);
  
    const slotMinTime = slotMinTimeDate.toTimeString().split(' ')[0];
    const slotMaxTime = slotMaxTimeDate.toTimeString().split(' ')[0];
  
    return { slotMinTime, slotMaxTime };
  }
}