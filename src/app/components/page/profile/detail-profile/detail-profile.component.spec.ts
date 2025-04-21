import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProfileComponent } from './detail-profile.component';

describe('DetailProfileComponent', () => {
  let component: DetailProfileComponent;
  let fixture: ComponentFixture<DetailProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProfileComponent]
    });
    fixture = TestBed.createComponent(DetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
