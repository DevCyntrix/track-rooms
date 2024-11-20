import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { LocationService } from '../location.service';
import { BuildingModel, FloorModel, RoomModel } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lookup-room',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './lookup-room.component.html',
  styleUrl: './lookup-room.component.css'
})

export class LookupRoomComponent implements OnInit {
  lookupForm: FormGroup;

  buildings: BuildingModel[] = [];
  floors: FloorModel[] = [];
  rooms: RoomModel[] = [];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private router: Router
  ) {
    this.lookupForm = this.fb.group({
      building: ['', Validators.required],
      floor: [{ value: '', disabled: true }, Validators.required],
      room: [{ value: '', disabled: true }, Validators.required],
      date: [{ value: null, disabled: true }, Validators.required],
    });
  }

  ngOnInit() {
    this.loadBuildings();

    this.lookupForm.get('building')?.valueChanges.subscribe((buildingId) => {
      if (buildingId) {
        this.loadFloors(buildingId);

        this.lookupForm.get('floor')?.reset();
        this.lookupForm.get('room')?.reset();
        this.lookupForm.get('date')?.reset();
        this.lookupForm.get('floor')?.enable();
        this.lookupForm.get('room')?.disable();
        this.lookupForm.get('date')?.disable();
        this.floors = [];
        this.rooms = [];
      } 
      else {
        this.lookupForm.get('floor')?.reset();
        this.lookupForm.get('floor')?.disable();
        this.lookupForm.get('room')?.reset();
        this.lookupForm.get('room')?.disable();
        this.lookupForm.get('date')?.reset();
        this.lookupForm.get('date')?.disable();
        this.floors = [];
        this.rooms = [];
      }
    });

    this.lookupForm.get('floor')?.valueChanges.subscribe((floorId) => {
      const buildingId = this.lookupForm.get('building')?.value;
      if (buildingId && floorId) {
        this.loadRooms(buildingId, floorId);

        this.lookupForm.get('room')?.reset();
        this.lookupForm.get('date')?.reset();
        this.lookupForm.get('room')?.enable();
        this.lookupForm.get('date')?.disable();
        this.rooms = [];
      } 
      else {
        this.lookupForm.get('room')?.reset();
        this.lookupForm.get('room')?.disable();
        this.lookupForm.get('date')?.reset();
        this.lookupForm.get('date')?.disable();
        this.rooms = [];
      }
    });

    this.lookupForm.get('room')?.valueChanges.subscribe((roomId) => {
      if (roomId) {
        this.lookupForm.get('date')?.enable();
      } else {
        this.lookupForm.get('date')?.reset();
        this.lookupForm.get('date')?.disable();
      }
    });
  }

  loadBuildings() {
    this.locationService.getBuildings().subscribe({
      next: (data) => {
        this.buildings = data;
      },
      error: (error) => {
        console.error('Error while trying to load buildings:', error);
      },
    });
  }

  loadFloors(buildingId: string) {
    this.locationService.getFloors(buildingId).subscribe({
      next: (data) => {
        this.floors = data;
      },
      error: (error) => {
        console.error('Error while trying to load floors:', error);
      },
    });
  }

  loadRooms(buildingId: string, floorId: string) {
    this.locationService.getRooms(buildingId, floorId).subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (error) => {
        console.error('Error while trying to load rooms:', error);
      },
    });
  }

  onSubmit() {
    if (this.lookupForm.valid) {
      const formValues = this.lookupForm.value;
      const queryParams = {
        roomKey: formValues.room,
        date: formValues.date.toISOString(),
      };
      this.router.navigate(['/timetable'], { queryParams });
    }
  }
}