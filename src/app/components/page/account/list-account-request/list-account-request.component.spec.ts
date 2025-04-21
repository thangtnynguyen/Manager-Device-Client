import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountRequestComponent } from './list-account-request.component';

describe('ListAccountRequestComponent', () => {
  let component: ListAccountRequestComponent;
  let fixture: ComponentFixture<ListAccountRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAccountRequestComponent]
    });
    fixture = TestBed.createComponent(ListAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
