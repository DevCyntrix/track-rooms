import React, { useState, useEffect } from 'react';
import './DropDown.css';

function DropDown() {
  const [building, setBuilding] = useState('building1');
  const [floor, setFloor] = useState('floor1');
  const [room, setRoom] = useState('room1');
  const [roomSchedule, setRoomSchedule] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [timeOptions, setTimeOptions] = useState([]);
  const [bookingConfirmation, setBookingConfirmation] = useState('');

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

  const handleTimeSelection = (time) => {
    if (!selectedStartTime) {
      setSelectedStartTime(time);
    } else {
      setSelectedEndTime(time);
    }
  };

  const handleFinalBooking = () => {
    if (selectedStartTime && selectedEndTime) {
      const confirmationMessage = `Raum ${room} von ${selectedStartTime} bis ${selectedEndTime} wurde erfolgreich gebucht.`;
      setBookingConfirmation(confirmationMessage);
      setSelectedStartTime('');
      setSelectedEndTime('');
      setShowPopup(false);
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
    const availableTimes = ['09:00', '10:00', '11:00', '12:00'];
    setTimeOptions(availableTimes);
  }, [roomSchedule]);

  useEffect(() => {
    if (showPopup) {
      setBookingConfirmation(''); // Zurücksetzen der Buchungsbestätigung, wenn das Popup geöffnet wird
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
      <div>
        <h3>{building === 'building1' ? 'Gebäude 6A' : 'Gebäude 6B'} {room}</h3>
        <p>{roomSchedule}</p>
        <button onClick={() => setShowPopup(true)}>Buchen</button>
        {bookingConfirmation && <p>{bookingConfirmation}</p>}
      </div>
      {showPopup && (
        <div className="popup">
          {selectedStartTime && selectedEndTime ? (
            <>
              <h3>Bestätigen Sie Ihre Buchung für {room}</h3>
              <p>Startzeit: {selectedStartTime}</p>
              <p>Endzeit: {selectedEndTime}</p>
              <button onClick={handleFinalBooking}>Abschließend buchen</button>
            </>
          ) : (
            <>
              <h3>{selectedStartTime ? 'Wählen Sie eine Endzeit' : 'Wählen Sie eine Startzeit'} für {room}</h3>
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
