import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersNumberComponent } from './reviewers-number.component';

describe('ReviewersNumberComponent', () => {
  let component: ReviewersNumberComponent;
  let fixture: ComponentFixture<ReviewersNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewersNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewersNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
