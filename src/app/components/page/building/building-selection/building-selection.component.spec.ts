import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingSelectionComponent } from './building-selection.component';

describe('BuildingSelectionComponent', () => {
  let component: BuildingSelectionComponent;
  let fixture: ComponentFixture<BuildingSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingSelectionComponent]
    });
    fixture = TestBed.createComponent(BuildingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
