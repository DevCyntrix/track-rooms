import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuildingModel, FloorModel, RoomBookingsModel, RoomModel } from './types';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl: string = "http://api.ssr-solutions.de:3000";

  constructor(private http: HttpClient) { }

  getBuildings(): Observable<BuildingModel[]> {
    return this.http.get<BuildingModel[]>(`${this.apiUrl}/buildings`);
  }

  getFloors(roomID: string) : Observable<FloorModel[]> {
    return this.http.get<FloorModel[]>(`${this.apiUrl}/buildings/${roomID}`);
  }

  getRooms(roomID: string, floorID: string) : Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(`${this.apiUrl}/buildings/${roomID}/${floorID}`);
  }

  getBookingsByRoom(roomKey: string) : Observable<RoomBookingsModel> {
    return this.http.get<RoomBookingsModel>(`${this.apiUrl}/rooms/${roomKey}`);
  }
}