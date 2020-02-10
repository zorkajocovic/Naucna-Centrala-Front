import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SciFieldComponent } from './sci-field.component';

describe('SciFieldComponent', () => {
  let component: SciFieldComponent;
  let fixture: ComponentFixture<SciFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SciFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SciFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
