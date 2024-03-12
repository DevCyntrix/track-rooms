import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DropDown.css';
import RoomSchedule from '../roomSchedule/RoomSchedule';


function DropDown() {
  const [building, setBuilding] = useState('building1');
  const [floor, setFloor] = useState('floor1');
  const [room, setRoom] = useState('');
  const [roomSchedule, setRoomSchedule] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [timeOptions, setTimeOptions] = useState([]);
  const [bookingConfirmation, setBookingConfirmation] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timeSelectionText, setTimeSelectionText] = useState('Wählen Sie die Startzeit');

  // Helper function to generate time options from 8:00 to 20:00 in 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
    setFloor('floor1');
    setRoom('room1');
  };

  const handleFloorChange = (event) => {
    setFloor(event.target.value);
    setRoom('room1');
  };

  const handleRoomChange = (event) => {
    const selectedRoom = event.target.value;
    setRoom(selectedRoom);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsButtonDisabled(false);
  };

  const handleTimeSelection = (time) => {
    if (!selectedStartTime) {
      setSelectedStartTime(time);
      setTimeSelectionText('Wählen Sie die Endzeit');
    } else {
      setSelectedEndTime(time);
      setTimeSelectionText('');
    }
  };

  const handleFinalBooking = async () => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      console.log('selectedDate:', selectedDate);
      console.log('selectedStartTime:', selectedStartTime);
      console.log('selectedEndTime:', selectedEndTime);
      console.log('room:', room);
  
      const formattedSelectedDate = selectedDate.toLocaleDateString('en-CA');
      console.log('formattedSelectedDate:', formattedSelectedDate);
  
      const bookingStartDate = new Date(`${formattedSelectedDate}T${selectedStartTime}`);
      const bookingEndDate = new Date(`${formattedSelectedDate}T${selectedEndTime}`);
  
      console.log('bookingStartDate:', bookingStartDate);
      console.log('bookingEndDate:', bookingEndDate);
  
      if (isNaN(bookingStartDate.getTime()) || isNaN(bookingEndDate.getTime())) {
        console.error('Invalid date format');
        return;
      }
  
      const bookingDetails = {
        bookingStartDate: bookingStartDate.toISOString(),
        bookingEndDate: bookingEndDate.toISOString(),
        roomId: room,
      };

      try {

        const response = await fetch('http://localhost:5555/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Error booking room');
      }

        const confirmationMessage = `Raum ${room} am ${selectedDate.toLocaleDateString()} von ${selectedStartTime} bis ${selectedEndTime} wurde erfolgreich gebucht.`;
        setBookingConfirmation(confirmationMessage);
        setSelectedDate(null);
        setSelectedStartTime('');
        setSelectedEndTime('');
        setShowPopup(false);
        setIsButtonDisabled(true);
      } catch (error) {
        console.error('Error booking room:', error);
      }
    }
  };

  const roomOptions = {
    building1: {
      floor0: ['6A040', '6A052'],
      floor1: ['6A173', '6A140'],
      floor2: ['6A240', '6A277'],
      floor3: ['6A310', '6A312'],
      floor4: ['6A452', '6A453']
    },
    building2: {
      floor0: ['6B040', '6B052'],
      floor1: ['6B173', '6B140'],
      floor2: ['6B240', '6B277'],
      floor3: ['6B310', '6B312'],
      floor4: ['6B452', '6B453']
    },
  };

  const availableRooms = roomOptions[building][floor];

  const fetchRoomSchedule = async () => {
    try {
      const response = await fetch(`http://localhost:5555/bookings/${room}`);
      const data = await response.json();
      setRoomSchedule(data.schedule);
    } catch (error) {
      console.error('Error fetching room schedule:', error);
    }
  };

  // useEffect(() => {
  //   fetchRoomSchedule();
  // }, [room]);

  useEffect(() => {
    const availableTimes = generateTimeOptions();
    setTimeOptions(availableTimes);
  }, [roomSchedule]);

  useEffect(() => {
    if (showPopup) {
      setBookingConfirmation('');
      setTimeSelectionText('Wählen Sie die Startzeit'); // Reset time selection text when popup is opened
    }
  }, [showPopup]);

  useEffect(() => {
    setRoom(''); // Setzt den Raum zurück, wenn das Gebäude geändert wird
  }, [building]);

  useEffect(() => {
    setRoom(''); // Setzt den Raum zurück, wenn das Gebäude geändert wird
  }, [floor]);

  return (
    <div className="container">
      <h2>Track Rooms</h2>
      <div className="dropdown">
        <label htmlFor="buildingSelect">Gebäude:</label>
        <select id="buildingSelect" value={building} onChange={handleBuildingChange}>
          <option value="building1">6A</option>
          <option value="building2">6B</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="floorSelect">Etage:</label>
        <select id="floorSelect" value={floor} onChange={handleFloorChange}>
          <option value="floor0">0</option>
          <option value="floor1">1</option>
          <option value="floor2">2</option>
          <option value="floor3">3</option>
          <option value="floor4">4</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="roomSelect">Raum:</label>
        <select id="roomSelect" value={room} onChange={handleRoomChange}>
          <option value="">Select a room</option>
          {availableRooms.map((roomOption) => (
            <option key={roomOption} value={roomOption}>{roomOption}</option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label>Datum:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <div>
        <h3>{building === 'building1' ? 'Gebäude 6A' : 'Gebäude 6B'} {room}</h3>
        <p>{roomSchedule}</p>
        <button id="buchenbutton" onClick={() => setShowPopup(true)} disabled={isButtonDisabled}>Buchen</button>
        {bookingConfirmation && <p>{bookingConfirmation}</p>}
        <div class="calendar-container">
          {room && <RoomSchedule room={room} />}
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          {selectedDate && selectedStartTime && selectedEndTime ? (
            <>
              <h3>Bestätigen Sie Ihre Buchung für {room}</h3>
              <p>Datum: {selectedDate.toLocaleDateString()}</p>
              <p>Startzeit: {selectedStartTime}</p>
              <p>Endzeit: {selectedEndTime}</p>
              <button onClick={handleFinalBooking}>Abschließend buchen</button>
            </>
          ) : (
            <>
              <h3>{timeSelectionText} für {room}</h3>
              <div className="time-options">
                {timeOptions.map((timeOption) => (
                  <button key={timeOption} onClick={() => handleTimeSelection(timeOption)}>{timeOption}</button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DropDown;
