import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionComponent } from './assign-permission.component';

describe('AssignPermissionComponent', () => {
  let component: AssignPermissionComponent;
  let fixture: ComponentFixture<AssignPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
