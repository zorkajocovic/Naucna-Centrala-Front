import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPdfComponent } from './check-pdf.component';

describe('CheckPdfComponent', () => {
  let component: CheckPdfComponent;
  let fixture: ComponentFixture<CheckPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
