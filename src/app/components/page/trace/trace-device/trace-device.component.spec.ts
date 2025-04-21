import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceDeviceComponent } from './trace-device.component';

describe('TraceDeviceComponent', () => {
  let component: TraceDeviceComponent;
  let fixture: ComponentFixture<TraceDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraceDeviceComponent]
    });
    fixture = TestBed.createComponent(TraceDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
