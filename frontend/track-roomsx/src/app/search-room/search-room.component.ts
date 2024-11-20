import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-search-room',
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
  templateUrl: './search-room.component.html',
  styleUrl: './search-room.component.css'
})
export class SearchRoomComponent {
  searchForm: FormGroup;
  buildings: string[] = ['A', 'B'];
  floors: string[] = ['1', '2', '3'];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      startDate: [null, Validators.required],
      startTime: ['', Validators.required],
      endDate: [null, Validators.required],
      endTime: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const formValues = this.searchForm.value;

      const startDateTime = this.combineDateAndTime(
        formValues.startDate,
        formValues.startTime
      );
      const endDateTime = this.combineDateAndTime(
        formValues.endDate,
        formValues.endTime
      );

      console.log('Start:', startDateTime);
      console.log('End:', endDateTime);
      console.log('Building:', formValues.building);
      console.log('Floor:', formValues.floor);
    }
  }

  combineDateAndTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours);
    combinedDate.setMinutes(minutes);
    return combinedDate.toLocaleString(); // Format: 'DD.MM.YYYY, HH:MM:SS'
  }
}
