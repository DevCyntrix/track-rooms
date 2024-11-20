import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchRoomComponent } from './search-room/search-room.component';
import { LookupRoomComponent } from './lookup-room/lookup-room.component';
import { TimetableComponent } from './timetable/timetable.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'search-room', component: SearchRoomComponent },
    { path: 'lookup-room', component: LookupRoomComponent },
    { path: 'timetable', component: TimetableComponent},
];