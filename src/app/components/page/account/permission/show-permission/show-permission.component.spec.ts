import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPermissionComponent } from './show-permission.component';

describe('ShowPermissionComponent', () => {
  let component: ShowPermissionComponent;
  let fixture: ComponentFixture<ShowPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
