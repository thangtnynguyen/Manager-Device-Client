import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingSelectComponent } from './building-select.component';

describe('BuildingSelectComponent', () => {
  let component: BuildingSelectComponent;
  let fixture: ComponentFixture<BuildingSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingSelectComponent]
    });
    fixture = TestBed.createComponent(BuildingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
