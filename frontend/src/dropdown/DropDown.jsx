import React, { useState, useEffect } from 'react';
import './DropDown.css';

function DropDown() {
  const [building, setBuilding] = useState('building1');
  const [floor, setFloor] = useState('floor1');
  const [room, setRoom] = useState('room1');
  const [roomSchedule, setRoomSchedule] = useState(''); // Zustand für den Raumzeitplan

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
    setFloor('floor1'); // Reset floor selection
    setRoom('room1'); // Reset room selection
  };

  const handleFloorChange = (event) => {
    setFloor(event.target.value);
    setRoom('room1'); // Reset room selection
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  // Define room options based on building and floor
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

  // Simuliere eine API-Anfrage, um den Zeitplan für den ausgewählten Raum abzurufen
  const fetchRoomSchedule = async () => {
    try {
      // Hier die URL für die Backend-Anfrage einfügen
      const response = await fetch(`API_URL/${room}`); // Beispiel-URL, ersetzen Sie 'API_URL' durch Ihre tatsächliche Backend-URL
      const data = await response.json();
      setRoomSchedule(data.schedule); // Annahme: Das Backend sendet den Raumzeitplan als JSON-Daten mit dem Schlüssel 'schedule'
    } catch (error) {
      console.error('Error fetching room schedule:', error);
      // Behandeln Sie den Fehler entsprechend
    }
  };

  useEffect(() => {
    fetchRoomSchedule(); // Bei Änderungen von 'room' den Raumzeitplan abrufen
  }, [room]);

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
        <p>{roomSchedule}</p> {/* Hier wird der Raumzeitplan angezeigt */}
      </div>
    </div>
  );
}

export default DropDown;
