import React, { useState } from 'react';
import './DropDown.css';

function DropDown() {
  const [building, setBuilding] = useState('building1'); // Standardwert für das ausgewählte Gebäude

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
  };

  return (
    <div className="container">
      <h2>Gebäude und Etagen Auswahl</h2>
      <div className="dropdown">
        <label htmlFor="buildingSelect">Gebäude:</label>
        <select id="buildingSelect" value={building} onChange={handleBuildingChange}>
          <option value="building1">Gebäude 1</option>
          <option value="building2">Gebäude 2</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="floorSelect">Etage:</label>
        <select id="floorSelect">
          {building === 'building1' ? (
            <>
              <option value="floor1">Etage 1</option>
              <option value="floor2">Etage 2</option>
            </>
          ) : (
            <>
              <option value="floor1">Etage 1</option>
              <option value="floor2">Etage 2</option>
              <option value="floor3">Etage 3</option>
            </>
          )}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="roomSelect">Raum:</label>
        <select id="roomSelect">
          {building === 'building1' ? (
            <>
              <option value="room1">Raum 1</option>
              <option value="room2">Raum 2</option>
            </>
          ) : (
            <>
              <option value="room1">Raum 1</option>
              <option value="room2">Raum 2</option>
              <option value="room3">Raum 3</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
}

export default DropDown;
