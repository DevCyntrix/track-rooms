import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupRoomComponent } from './lookup-room.component';

describe('LookupRoomComponent', () => {
  let component: LookupRoomComponent;
  let fixture: ComponentFixture<LookupRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookupRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LookupRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
