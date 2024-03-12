import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DropDown.css';

function DropDown() {
  const [building, setBuilding] = useState('building1');
  const [floor, setFloor] = useState('floor1');
  const [room, setRoom] = useState('room1');
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
    setRoom(event.target.value);
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

  const handleFinalBooking = () => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      const confirmationMessage = `Raum ${room} am ${selectedDate.toLocaleDateString()} von ${selectedStartTime} bis ${selectedEndTime} wurde erfolgreich gebucht.`;
      setBookingConfirmation(confirmationMessage);
      setSelectedDate(null);
      setSelectedStartTime('');
      setSelectedEndTime('');
      setShowPopup(false);
      setIsButtonDisabled(true);
    }
  };

  const roomOptions = {
    building1: {
      floor1: ['room1', 'room2'],
      floor2: ['room3', 'room4'],
      floor3: ['room9', 'room10'],
      floor4: ['room10', 'room11']
    },
    building2: {
      floor1: ['room5', 'room6'],
      floor2: ['room7', 'room8'],
      floor3: ['room9', 'room10'],
      floor4: ['room10', 'room11']
    },
  };

  const availableRooms = roomOptions[building][floor];

  const fetchRoomSchedule = async () => {
    try {
      const response = await fetch(`API_URL${room}`);
      const data = await response.json();
      setRoomSchedule(data.schedule);
    } catch (error) {
      console.error('Error fetching room schedule:', error);
    }
  };

  useEffect(() => {
    fetchRoomSchedule();
  }, [room]);

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
        <button onClick={() => setShowPopup(true)} disabled={isButtonDisabled}>Buchen</button>
        {bookingConfirmation && <p>{bookingConfirmation}</p>}
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
