import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersChooseComponent } from './reviewers-choose.component';

describe('ReviewersChooseComponent', () => {
  let component: ReviewersChooseComponent;
  let fixture: ComponentFixture<ReviewersChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewersChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewersChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
