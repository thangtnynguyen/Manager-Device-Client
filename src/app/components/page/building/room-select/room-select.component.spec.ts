import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSelectComponent } from './room-select.component';

describe('RoomSelectComponent', () => {
  let component: RoomSelectComponent;
  let fixture: ComponentFixture<RoomSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomSelectComponent]
    });
    fixture = TestBed.createComponent(RoomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
