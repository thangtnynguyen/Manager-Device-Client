import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeviceComponent } from './list-device.component';

describe('ListDeviceComponent', () => {
  let component: ListDeviceComponent;
  let fixture: ComponentFixture<ListDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDeviceComponent]
    });
    fixture = TestBed.createComponent(ListDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
