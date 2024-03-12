
import "./DropDown.css";

export default function DropDown({id, open, onClick, labelText, children}){

    function handleClick(){ //if accordion clicked on then reverse state (default state is closed/false)
        onClick(id);
    }

    function toggleDropdown() {
        var dropdownMenu = document.getElementById("myDropdown");
        dropdownMenu.classList.toggle("show");
      }
      
      // Schließe das Dropdown-Menü, wenn außerhalb davon geklickt wird
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    return( //what is displayed on the screen; instead of labelText do menu photo
    <div class="dropdown">
        <button onclick="toggleDropdown()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
        <a href="#">Eintrag 1</a>
        <a href="#">Eintrag 2</a>
        <a href="#">Eintrag 3</a>
    </div>
  </div>
    );
}