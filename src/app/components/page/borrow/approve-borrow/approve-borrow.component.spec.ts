import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBorrowComponent } from './approve-borrow.component';

describe('ApproveBorrowComponent', () => {
  let component: ApproveBorrowComponent;
  let fixture: ComponentFixture<ApproveBorrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveBorrowComponent]
    });
    fixture = TestBed.createComponent(ApproveBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
