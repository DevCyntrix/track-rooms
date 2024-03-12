
import "./DropDown.css";

function DropDown() {
  return (
    <div class="container">
    <h2>Gebäude und Etagen Auswahl</h2>
    <div class="dropdown">
      <label for="buildingSelect">Gebäude:</label>
      <select id="buildingSelect">
        <option value="building1">Gebäude 1</option>
        <option value="building2">Gebäude 2</option>
      </select>
    </div>
    <div class="dropdown">
      <label for="floorSelect">Etage:</label>
      <select id="floorSelect">
        <option value="floor1">Etage 1</option>
        <option value="floor2">Etage 2</option>
        <option value="floor3">Etage 3</option>
      </select>
    </div>
    <div class="dropdown">
      <label for="roomSelect">Raum:</label>
      <select id="roomSelect">
        <option value="room1">Raum 1</option>
        <option value="room2">Raum 2</option>
        <option value="room3">Raum 3</option>
      </select>
    </div>
  </div>
   );
}

export default DropDown;

document.addEventListener('DOMContentLoaded', function() {
  const buildingSelect = document.getElementById('buildingSelect');
  const floorSelect = document.getElementById('floorSelect');
  
  buildingSelect.addEventListener('change', function() {
    // Leere das Etagen-Auswahlmenü
    floorSelect.innerHTML = '';
    
    // Füge Etagen basierend auf der Gebäudeauswahl hinzu
    if (buildingSelect.value === 'building1') {
      addOption(floorSelect, 'Etage 1', 'floor1');
      addOption(floorSelect, 'Etage 2', 'floor2');
    } else if (buildingSelect.value === 'building2') {
      addOption(floorSelect, 'Etage 1', 'floor1');
      addOption(floorSelect, 'Etage 2', 'floor2');
      addOption(floorSelect, 'Etage 3', 'floor3');
    }
  });
});

// Hilfsfunktion zum Hinzufügen von Optionen zu einem Select-Element
function addOption(selectElement, text, value) {
  const option = document.createElement('option');
  option.textContent = text;
  option.value = value;
  selectElement.appendChild(option);
}
