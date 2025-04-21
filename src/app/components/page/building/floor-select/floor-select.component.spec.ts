import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorSelectComponent } from './floor-select.component';

describe('FloorSelectComponent', () => {
  let component: FloorSelectComponent;
  let fixture: ComponentFixture<FloorSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorSelectComponent]
    });
    fixture = TestBed.createComponent(FloorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
