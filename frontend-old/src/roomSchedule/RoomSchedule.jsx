import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import this
import './RoomSchedule.css';

function RoomSchedule({ room }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch bookings for the selected room
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5555/bookings/${room}`);
        const data = await response.json();
        const bookings = data.map(booking => ({
          id: booking.roomId,
          start: booking.bookingStartDate,
          end: booking.bookingEndDate
        }));
        console.log('bookings:', bookings); // Hinzugefügt für Debugging
        setEvents(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    fetchBookings();
  }, [room]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]} // Add timeGridPlugin
      initialView="timeGridDay" // Change to timeGridDay
      events={events}
      slotLabelFormat={{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }}
      allDaySlot={false}
      height = "400px"
      zindex = "-1"
      
    />
  );
}

export default RoomSchedule;