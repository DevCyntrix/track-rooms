import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SearchRoomComponent } from './search-room/search-room.component';
import { TimetableComponent } from './timetable/timetable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SearchRoomComponent, TimetableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
