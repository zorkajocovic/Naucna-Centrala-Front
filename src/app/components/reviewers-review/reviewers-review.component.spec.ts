import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersReviewComponent } from './reviewers-review.component';

describe('ReviewersReviewComponent', () => {
  let component: ReviewersReviewComponent;
  let fixture: ComponentFixture<ReviewersReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewersReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewersReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
