import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectPdfComponent } from './correct-pdf.component';

describe('CorrectPdfComponent', () => {
  let component: CorrectPdfComponent;
  let fixture: ComponentFixture<CorrectPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
